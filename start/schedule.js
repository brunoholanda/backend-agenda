const CronJob = require('node-cron');
const Mail = use('Mail');
const Database = use('Database');
const moment = require('moment');

CronJob.schedule('0 12 * * *', async () => {
  console.log('Executando a tarefa cron...');

  const today = moment().format('DD/MM/YYYY');

    const agendamentosParaEmail = await Database
        .table('agendamentos')
        .innerJoin('clients', 'agendamentos.client_id', 'clients.id')
        .innerJoin('companies', 'agendamentos.company_id', 'companies.company_id')
        .where('agendamentos.data', today)
        .where('agendamentos.status', 1)
        .where('companies.service_id', 3)
        .select('agendamentos.*', 'clients.client_email', 'companies.service_id');


    for (let agendamento of agendamentosParaEmail) {

        await Mail.send('emails.pesquisa_satisfacao', {
            clienteNome: agendamento.nome,
            company_id: agendamento.company_id
        }, (message) => {
            message
                .to(agendamento.client_email)
                .from('contato@marquei.com.br')
                .subject('Pesquisa de Satisfação');
        });
    }
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});
