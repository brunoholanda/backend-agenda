'use strict'

const Contabilidade = use('App/Models/Contabilidade')

class ContabilidadeController {
  async index({ response }) {
    const contabilidades = await Contabilidade.all()
    return response.json(contabilidades)
  }


// ... outros métodos

async saldo({ auth, response }) {
  const user = await auth.getUser();
  const receitasTotal = await Contabilidade
    .query()
    .where('company_id', user.company_id)
    .sum('receita as total')
    .first();

  const despesasTotal = await Contabilidade
    .query()
    .where('company_id', user.company_id)
    .sum('despesa as total')
    .first();

  const saldo = (receitasTotal.total || 0) - (despesasTotal.total || 0);

  return response.json({ saldo });
}


  async store({ request, auth, response }) {
    const user = await auth.getUser()
    const data = request.only([
      'receita',
      'descricao_receita',
      'recorrencia_receita',
      'recorrencia_qt_receita',
      'despesa',
      'descricao_despesa',
      'recorrencia_despesa',
      'recorrencia_qt_despesa'
    ])

    const contabilidade = await Contabilidade.create({
      ...data,
      company_id: user.company_id // Certifique-se de que o usuário tem um company_id associado
    })

    return response.status(201).json(contabilidade)
  }

  async show({ params, response }) {
    const contabilidade = await Contabilidade.findOrFail(params.id)
    return response.json(contabilidade)
  }

  async update({ params, request, response }) {
    const contabilidade = await Contabilidade.findOrFail(params.id)
    const data = request.only([
      'receita',
      'descricao_receita',
      'recorrencia_receita',
      'recorrencia_qt_receita',
      'despesa',
      'descricao_despesa',
      'recorrencia_despesa',
      'recorrencia_qt_despesa'
    ])

    contabilidade.merge(data)
    await contabilidade.save()

    return response.json(contabilidade)
  }

  async destroy({ params, response }) {
    const contabilidade = await Contabilidade.findOrFail(params.id)
    await contabilidade.delete()

    return response.status(204).send()
  }
}

module.exports = ContabilidadeController
