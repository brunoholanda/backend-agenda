const Service = use('App/Models/Service');
const Redis = use('Redis');

class ServiceController {
  // Endpoint para buscar todos os serviços
  async index({ response }) {
    const cacheKey = 'services:index';

    try {
      // Tenta recuperar os serviços do cache
      let services = await Redis.get(cacheKey);

      if (services) {
        services = JSON.parse(services);  // Deserializa os dados do cache
      } else {
        // Se não houver no cache, busca do banco e armazena no cache
        const result = await Service.all();
        services = result.toJSON();
        await Redis.set(cacheKey, JSON.stringify(services), 'EX', 60 * 60); // Cache válido por 1 hora
      }

      return response.json(services);
    } catch (error) {
      return response.status(500).json({ message: 'Houve um erro ao buscar os serviços', error });
    }
  }

  async show({ params, response }) {
    const cacheKey = `services:show:${params.id}`;

    try {
      // Tenta recuperar o serviço do cache
      let service = await Redis.get(cacheKey);

      if (service) {
        service = JSON.parse(service);  // Deserializa os dados do cache
      } else {
        // Se não houver no cache, busca do banco e armazena no cache
        const result = await Service.find(params.id);
        if (!result) {
          return response.status(404).json({ message: 'Serviço não encontrado' });
        }
        service = result.toJSON();
        await Redis.set(cacheKey, JSON.stringify(service), 'EX', 60 * 60); // Cache válido por 1 hora
      }

      return response.json(service);
    } catch (error) {
      return response.status(500).json({ message: 'Houve um erro ao buscar os detalhes do serviço', error });
    }
  }

}

module.exports = ServiceController;
