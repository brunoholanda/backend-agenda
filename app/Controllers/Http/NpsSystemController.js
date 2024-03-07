'use strict'

const NpsSystem = use('App/Models/NpsSystem')

class NpsSystemController {
  // Método para tratar GET requests
  async index({ request, response }) {
    try {
      const company_id = request.input('company_id'); // Pegue o company_id da query string

      if (!company_id) {
        return response.status(400).json({ message: 'company_id é obrigatório' });
      }

      const companyEntries = await NpsSystem.query()
        .where('company_id', company_id) // Adicione o filtro para company_id
        .with('company')
        .fetch();

      return response.json(companyEntries);
    } catch (err) {
      return response.status(500).json({ message: 'Erro ao buscar dados', error: err.message });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only(['nome', 'telefone', 'nota', 'company_id'])
      const newEntry = await NpsSystem.create(data)
      return response.status(201).json(newEntry)
    } catch (err) {
      return response.status(500).json({ message: 'Erro ao salvar dados', error: err.message })
    }
  }
}

module.exports = NpsSystemController
