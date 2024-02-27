'use strict'


const Agendamento = use('App/Models/Agendamento')
const Database = use('Database')
const io = require("../../../start/socket");

class AgendamentoController {

  // Método para criar um agendamento
  async store({ request, response }) {
    const data = request.only(['nome', 'data', 'horario', 'motivo', 'cpf', 'celular', 'planodental', 'professional_id', 'client_id', 'company_id']);

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

}

module.exports = AgendamentoController
