'use strict'

const Chamado = use('App/Models/Chamado')
const Company = use('App/Models/Company')

class ChamadoController {
  async store ({ request, response }) {
    const { type, description, companyId } = request.only(['type', 'description', 'companyId'])

    // Buscar o nome da empresa baseado no companyId
    const company = await Company.findBy('company_id', companyId);
    if (!company) {
      return response.status(404).json({message: "Empresa não encontrada"});
    }
    const companyName = company.nome;  // Substitua 'name' pelo campo correto do seu modelo de empresa

    // Criar número do chamado
    const ticketNumber = `${new Date().toISOString().replace(/[^0-9]/g, '')}${companyId}`

    // Criar o chamado
    const chamado = await Chamado.create({
      company_name: companyName,
      type,
      description,
      company_id: companyId,
      ticket_number: ticketNumber
    })

    return response.status(201).json(chamado)
  }

  async index({ params, response }) {
    const { companyId } = params;

    try {
      const chamados = await Chamado.query()
        .where('company_id', companyId)
        .fetch();

      return response.json(chamados);
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar chamados' });
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const { status, answer } = request.only(['status', 'answer']);

    const chamado = await Chamado.find(id);
    if (!chamado) {
      return response.status(404).json({ message: 'Chamado não encontrado' });
    }

    chamado.status = status;
    chamado.answer = answer;
    await chamado.save();

    return response.status(200).json(chamado);
  }

}

module.exports = ChamadoController
