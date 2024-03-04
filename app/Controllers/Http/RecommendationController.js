'use strict'

const Recommendation = use('App/Models/Recommendation')
const Company = use('App/Models/Company')

class RecommendationController {
  async store ({ request, response }) {
    const { companyId, indicated, especialidade, telefone } = request.only(['companyId', 'indicated', 'especialidade', 'telefone'])

    if (!companyId || !indicated || !especialidade || !telefone) {
      return response.status(400).json({ message: "Preencha todos os campos obrigatórios" });
    }

    const company = await Company.findBy('company_id', companyId);
    if (!company) {
      return response.status(404).json({ message: "Empresa não encontrada" });
    }
    const companyName = company.nome;

    const recommendation = await Recommendation.create({
      company_name: companyName,
      company_id: companyId,
      indicated,
      especialidade,
      telefone
    })

    return response.status(201).json(recommendation)
  }

  async index({ request, response }) {
    const companyId = request.params.companyId;
    const recommendations = await Recommendation.query()
      .where('company_id', companyId)
      .fetch();
    return response.json(recommendations);
  }

  async update({ params, request, response }) {
    const { status, motivo } = request.only(['status', 'motivo']);
    const recommendation = await Recommendation.find(params.id);

    if (!recommendation) {
      return response.status(404).json({ message: "Recomendação não encontrada" });
    }

    recommendation.merge({ status, motivo });
    await recommendation.save();

    return response.json(recommendation);
  }

  async destroy({ params, response }) {
    const recommendation = await Recommendation.find(params.id);

    if (!recommendation) {
      return response.status(404).json({ message: "Recomendação não encontrada" });
    }

    await recommendation.delete();
    return response.status(204).json({});
  }
}

module.exports = RecommendationController
