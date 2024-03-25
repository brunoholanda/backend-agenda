'use strict'

const Endereco = use('App/Models/Endereco')

class EnderecoController {
  async index({ request, response }) {
    const enderecos = await Endereco.query().fetch()
    return response.json(enderecos)
  }

  async store({ request, response }) {
    const data = request.only(['professional_id', 'cep', 'rua', 'numero', 'referencia', 'uf', 'cidade', 'bairro', 'multiplo'])
    const endereco = await Endereco.create(data)
    return response.status(201).json(endereco)
  }

  async show({ params, response }) {
    const endereco = await Endereco.findOrFail(params.id)
    return response.json(endereco)
  }

  async update({ params, request, response }) {
    const endereco = await Endereco.findOrFail(params.id)
    const data = request.only(['professional_id', 'cep', 'rua', 'numero', 'referencia', 'uf', 'cidade', 'bairro', 'multiplo'])

    endereco.merge(data)
    await endereco.save()

    return response.json(endereco)
  }

  async destroy({ params, response }) {
    const endereco = await Endereco.findOrFail(params.id)
    await endereco.delete()

    return response.status(204).send()
  }

  async findByProfessionalId({ params, response }) {
    const enderecos = await Endereco.query().where('professional_id', params.professional_id).fetch();
    return response.json(enderecos);
}

}

module.exports = EnderecoController
