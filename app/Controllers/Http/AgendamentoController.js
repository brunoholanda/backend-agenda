'use strict'


const Agendamento = use('App/Models/Agendamento')
const Database = use('Database')
const io = require("../../../start/socket");
const CryptoJS = require("crypto-js");
const Env = use('Env');

class AgendamentoController {

  // Método para criar um agendamento
  async store({ request, response }) {
    const data = request.only(['nome', 'data', 'horario', 'motivo', 'email', 'celular', 'planodental', 'professional_id', 'client_id', 'company_id', 'end_time']);

    const professionalIdValue = data.professional_id ? parseInt(data.professional_id) : null;

    try {
      const agendamento = await Agendamento.create({ ...data, professional_id: professionalIdValue });
      io.to('calendar').emit('newAppointment', agendamento.toJSON());

      return response.status(200).json(agendamento);
    } catch (err) {
      console.error(err.message);
      return response.status(500).json({ error: 'Erro ao inserir agendamento no banco de dados.' });
    }
  }

  async index({ request, response }) {
    const { data, professional_id, company_id } = request.get();  // Adicionando company_id

    try {
      let query = Agendamento.query();

      if (data) {
        query.where('data', data);
      }

      if (professional_id) {
        query.where('professional_id', professional_id);
      }

      if (company_id) {
        query.where('company_id', company_id);  // Filtrando por company_id
      }

      const result = await query.fetch();
      return response.status(200).json(result);
    } catch (err) {
      console.error("Erro ao executar a query:", err);
      return response.status(500).json({ error: 'Erro ao buscar os horários agendados.' });
    }
  }


  async occupiedHours({ request, response }) {
    const { data, professional_id } = request.get();

    try {
      const agendamentos = await Agendamento
        .query()
        .where('data', data)
        .where('professional_id', professional_id)
        .select('id', 'data', 'horario', 'professional_id', 'company_id')
        .fetch();

      return response.status(200).json(agendamentos);
    } catch (err) {
      console.error("Erro ao buscar horários ocupados:", err);
      return response.status(500).json({ error: 'Erro ao buscar horários ocupados.' });
    }
  }


  async all({ request, response, params }) {
    const { professional_id, client_id, company_id, page = 1, limit = 10 } = request.get();
    const { id } = params;

    try {
      let query = Agendamento.query();

      if (professional_id) {
        query.where('professional_id', professional_id);
      }

      if (client_id) {
        query.where('client_id', client_id);
      }

      if (company_id) {
        query.where('company_id', company_id);
      }

      if (id) {
        query.where('id', id);
      }

      const agendamentos = await query.paginate(page, limit);
      return response.status(200).json(agendamentos);
    } catch (err) {
      console.error("Erro ao executar a query:", err);
      return response.status(500).json({ error: 'Erro ao buscar todos os agendamentos.' });
    }
  }

  async allCalendar({ request, response, params }) {
    const { professional_id, client_id, company_id } = request.get();
    const { id } = params;

    try {
      let query = Agendamento.query();

      if (professional_id) {
        query.where('professional_id', professional_id);
      }

      if (client_id) {
        query.where('client_id', client_id);
      }


      if (company_id) {
        query.where('company_id', company_id);
      }
      if (id) {
        query.where('id', id);
      }

      const agendamentos = await query.fetch();
      return response.status(200).json(agendamentos);
    } catch (err) {
      console.error("Erro ao executar a query:", err);
      return response.status(500).json({ error: 'Erro ao buscar todos os agendamentos.' });
    }
  }

  async show({ params, response }) {
    try {
      const agendamento = await Agendamento.find(params.id);
      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento não encontrado' });
      }
      return response.status(200).json(agendamento);
    } catch (err) {
      console.error("Erro ao executar a query:", err);
      return response.status(500).json({ error: 'Erro ao buscar o agendamento.' });
    }
  }

  async update({ params, request, response }) {
    const id = params.id;
    const { data, horario, status, infoadicional } = request.post();

    try {
      const agendamento = await Agendamento.find(id);
      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento não encontrado' });
      }

      if (data) agendamento.data = data;
      if (horario) agendamento.horario = horario;
      if (status !== undefined) agendamento.status = status;
      if (infoadicional) agendamento.infoadicional = infoadicional;  // Nome do campo em minúsculas

      await agendamento.save();
      return response.status(200).json({ success: true, data: agendamento });
    } catch (err) {
      console.error("Erro ao executar a query:", err);
      return response.status(500).json({ error: 'Erro ao atualizar o agendamento.' });
    }
  }

  async destroy({ params, response }) {
    try {
      const agendamento = await Agendamento.find(params.id);
      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento não encontrado.' });
      }

      await agendamento.delete();
      return response.status(200).json({ success: true, message: 'Agendamento excluído com sucesso.' });
    } catch (err) {
      console.error("Erro ao tentar excluir o agendamento:", err);
      return response.status(500).json({ error: 'Erro ao tentar excluir o agendamento.' });
    }
  }

  async showAgendamentoById({ params, response }) {
    const secretKey = Env.get('SECRET_KEY');

    try {
      const agendamentoDetalhes = await Database
        .table('agendamentos')
        .where('agendamentos.id', params.id)
        .innerJoin('professionals', 'agendamentos.professional_id', 'professionals.id')
        .select('agendamentos.data', 'agendamentos.horario', 'professionals.nome as professional_nome')
        .first();

      if (!agendamentoDetalhes) {
        return response.status(404).json({ message: 'Agendamento não encontrado.' });
      }

      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(agendamentoDetalhes), secretKey).toString();

      return response.status(200).json({ data: encryptedData }); // Garanta o envio como objeto JSON
    } catch (err) {
      console.error("Erro ao buscar detalhes do agendamento:", err);
      return response.status(500).json({ error: 'Erro ao buscar detalhes do agendamento.' });
    }
  }

  async updateAgendamentoById({ params, request, response }) {
    try {
      const agendamento = await Agendamento.find(params.id);
      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento não encontrado.' });
      }

      const { status } = request.only(['status']);

      if (![1, 2].includes(status)) {
        return response.status(400).json({ message: 'Status inválido.' });
      }

      agendamento.status = status;
      await agendamento.save();

      return response.status(200).json({ message: 'Status do agendamento atualizado com sucesso.', agendamento });
    } catch (err) {
      console.error("Erro ao atualizar status do agendamento:", err);
      return response.status(500).json({ error: 'Erro ao atualizar status do agendamento.' });
    }
  }

}

module.exports = AgendamentoController
