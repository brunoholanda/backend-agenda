// app/Controllers/Http/ServiceController.js
const Service = use('App/Models/Service')

class ServiceController {
  // Endpoint para buscar todos os serviços
  async index({ response }) {
    try {
      const services = await Service.all()  // Busca todos os serviços
      return response.json(services)
    } catch (error) {
      return response.status(500).json({ message: 'Houve um erro ao buscar os serviços', error })
    }
  }

  async show({ params, response }) {
    try {
      const service = await Service.find(params.id)  // Busca um serviço pelo ID
      if (!service) {
        return response.status(404).json({ message: 'Serviço não encontrado' })
      }
      return response.json(service)
    } catch (error) {
      return response.status(500).json({ message: 'Houve um erro ao buscar os detalhes do serviço', error })
    }
  }

}

module.exports = ServiceController
