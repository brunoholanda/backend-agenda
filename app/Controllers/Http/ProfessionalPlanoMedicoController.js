'use strict'

const Professional = use('App/Models/Professional')

class ProfessionalPlanoMedicoController {

  // Listar planos médicos de um profissional
  async index({ params, response }) {
    const professional = await Professional.find(params.id)
    const planos = await professional.planosMedicos().fetch()
    return response.json(planos)
  }

  // Adicionar um plano médico a um profissional
  async store({ params, request, response }) {
    const professional = await Professional.find(params.professional_id)
    const plano_id = request.input('plano_id')
    await professional.planosMedicos().attach(plano_id)
    return response.status(200).send({ message: 'Plano médico adicionado com sucesso' })
  }

  // Remover um plano médico de um profissional
  async destroy({ params, request, response }) {
    const professional = await Professional.find(params.professional_id)
    const plano_id = request.input('plano_id')
    await professional.planosMedicos().detach(plano_id)
    return response.status(200).send({ message: 'Plano médico removido com sucesso' })
  }
}

module.exports = ProfessionalPlanoMedicoController
