'use strict'

const PlanoMedico = use('App/Models/PlanoMedico')

class PlanoMedicoController {

  async index ({ response }) {
  let planos = await PlanoMedico.all() // Corrigido para usar o modelo PlanoMedico
  return response.json(planos)
}

async store ({ request, response }) {
  const planoData = request.only(['nome'])
  const plano = await PlanoMedico.create(planoData)
  return response.created(plano)
}


}

module.exports = PlanoMedicoController
