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
}

module.exports = RecommendationController
