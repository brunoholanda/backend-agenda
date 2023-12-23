// app/Controllers/Http/ServiceController.js
const Service = use('App/Models/Service')

class ServiceController {
  async index({ response }) {
    try {
      const services = await Service.all()  // Busca todos os serviços
      return response.json(services)
    } catch (error) {
      return response.status(500).json({ message: 'Houve um erro ao buscar os serviços', error })
    }
  }
}

module.exports = ServiceController
