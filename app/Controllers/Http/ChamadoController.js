'use strict'

const Chamado = use('App/Models/Chamado')
const Company = use('App/Models/Company')
const Helpers = use('Helpers')

class ChamadoController {
  async store({ request, response }) {
    const { type, description, companyId } = request.only(['type', 'description', 'companyId'])

    const company = await Company.findBy('company_id', companyId)
    if (!company) {
      return response.status(404).json({ message: "Empresa não encontrada" })
    }
    const companyName = company.nome

    const imageUpload = request.file('image', {
      types: ['image'],
      size: '1mb'
    })

    let imagePath = null
    if (imageUpload) {
      const fileName = `${new Date().getTime()}.${imageUpload.subtype}`

      await imageUpload.move(Helpers.publicPath('uploads/chamados'), {
        name: fileName
      })

      if (!imageUpload.moved()) {
        return response.status(400).json({ message: imageUpload.error() })
      }

      imagePath = `/uploads/chamados/${fileName}`
    }

    const ticketNumber = `${new Date().toISOString().replace(/[^0-9]/g, '')}${companyId}`

    const chamado = await Chamado.create({
      company_name: companyName,
      type,
      description,
      company_id: companyId,
      ticket_number: ticketNumber,
      image_path: imagePath
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

  async deleteImage({ params, response }) {
    const chamado = await Chamado.find(params.id);
    if (!chamado) {
        return response.status(404).json({ message: 'Chamado não encontrado.' });
    }

    if (!chamado.image_path) {
        return response.status(400).json({ message: 'Nenhuma imagem para deletar.' });
    }

    const fs = require('fs').promises;
    const path = require('path');

    try {
        const fullPath = Helpers.publicPath(chamado.image_path.substring(1));

        await fs.unlink(fullPath);

        chamado.image_path = null;
        await chamado.save();

        return response.status(200).json({ message: 'Imagem deletada com sucesso.' });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ message: 'Erro ao deletar a imagem.' });
    }
}
}

module.exports = ChamadoController
