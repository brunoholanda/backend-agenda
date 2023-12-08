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

  async transacoesDoMes({ request, auth, response }) {
    const { month, year } = request.get();
    const user = await auth.getUser();

    const totalReceitas = await Contabilidade
      .query()
      .where('company_id', user.company_id)
      .whereRaw('extract(month from created_at) = ?', [month])
      .whereRaw('extract(year from created_at) = ?', [year])
      .sum('receita as total');

    const totalDespesas = await Contabilidade
      .query()
      .where('company_id', user.company_id)
      .whereRaw('extract(month from created_at) = ?', [month])
      .whereRaw('extract(year from created_at) = ?', [year])
      .sum('despesa as total');

    return response.json({
      totalReceitas: totalReceitas[0].total || 0,
      totalDespesas: totalDespesas[0].total || 0
    });
  }

  async lucroMensalDetalhado({ request, auth, response }) {
    const year = request.input('year', new Date().getFullYear());
    const user = await auth.getUser();
    let resultadosMensais = [];

    for (let month = 1; month <= 12; month++) {
      const receitas = await Contabilidade.query()
        .where('company_id', user.company_id)
        .whereRaw('extract(month from created_at) = ?', [month])
        .whereRaw('extract(year from created_at) = ?', [year])
        .sum('receita as total')
        .first();

      const despesas = await Contabilidade.query()
        .where('company_id', user.company_id)
        .whereRaw('extract(month from created_at) = ?', [month])
        .whereRaw('extract(year from created_at) = ?', [year])
        .sum('despesa as total')
        .first();

      const lucro = (receitas.total || 0) - (despesas.total || 0);

      resultadosMensais.push({
        month,
        year,
        receita: receitas.total || 0,
        despesa: despesas.total || 0,
        lucro
      });
    }

    return response.json(resultadosMensais);
  }

  async buscarTransacoes({ auth, response }) {
    const user = await auth.getUser();
    const transacoes = await Contabilidade.query()
      .where('company_id', user.company_id)
      .select('receita', 'descricao_receita', 'despesa', 'descricao_despesa', 'created_at') // Adicionado 'created_at'
      .fetch();

    return response.json(transacoes);
  }


async getTransactionsByMonthAndYear({ auth, request, response }) {
  const user = await auth.getUser();
  const { month, year } = request.get();

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  try {
    const transactions = await Contabilidade
      .query()
      .where('company_id', user.company_id) // Assegure-se que user.company_id é definido
      .andWhereBetween('created_at', [startDate, endDate])
      .fetch();

    return response.json(transactions);
  } catch (error) {
    return response.status(500).json({ message: "Erro ao buscar as transações.", error: error.message });
  }
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
