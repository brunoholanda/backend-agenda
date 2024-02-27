'use strict'

const Prontuario = use('App/Models/Prontuario')

class ProntuarioController {
  async store({ request, response }) {
    const data = request.only(['nome', 'professional_name', 'date', 'notes', 'company_id', 'client_id'])
    const prontuario = await Prontuario.create(data)
    return response.status(201).json(prontuario)
  }

  async index({ request, response }) {
    const clientId = request.params.clientId; // Acessando parâmetros da rota
    const prontuarios = await Prontuario.query().where('client_id', clientId).fetch()
    return response.json(prontuarios)
  }
}

module.exports = ProntuarioController
