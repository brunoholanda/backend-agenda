const CronJob = require('node-cron');
const Mail = use('Mail');
const Database = use('Database');
const moment = require('moment');

const sendConfirmationEmails = () => {
  CronJob.schedule('0 12 * * *', async () => {
    console.log('Executando tarefa de envio de e-mails de confirmação...');

    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

    try {
      const agendamentosParaConfirmacao = await Database
        .table('agendamentos')
        .innerJoin('clients', 'agendamentos.client_id', 'clients.id')
        .innerJoin('professionals', 'agendamentos.professional_id', 'professionals.id') // Ajuste aqui para juntar a tabela 'professionals'
        .whereRaw(`TO_DATE(agendamentos.data, 'DD/MM/YYYY') = ?`, [tomorrow])
        .select('agendamentos.*', 'clients.client_email', 'professionals.nome as professional_name', 'agendamentos.horario'); // Selecione o nome do profissional e o horário

      for (let agendamento of agendamentosParaConfirmacao) {
        const linkParaConfirmacao = `https://marquei.com.br/#/confirmar-consulta/${agendamento.id}`;

        await Mail.send('emails.confirm_consulta', {
          clienteNome: agendamento.nome,
          professionalNome: agendamento.professional_name,
          dataConsulta: agendamento.data,
          horarioConsulta: agendamento.horario,
          linkParaConfirmacao
        }, (message) => {
          message
            .to(agendamento.client_email)
            .from('contato@marquei.com.br')
            .subject('Confirmação de Consulta');
        });

        console.log(`E-mail de confirmação enviado para ${agendamento.client_email}`);
      }
    } catch (error) {
      console.error(`Erro ao enviar e-mail: ${error.message}`);
    }
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });
};

sendConfirmationEmails();

module.exports = { sendConfirmationEmails };
