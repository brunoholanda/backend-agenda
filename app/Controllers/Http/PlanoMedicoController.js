'use strict'

const PlanoMedico = use('App/Models/PlanoMedico');
const Redis = use('Redis');

class PlanoMedicoController {
  async index({ response }) {
    const cacheKey = 'planos:index';

    try {
      // Tenta recuperar os planos do cache
      let planos = await Redis.get(cacheKey);

      if (planos) {
        planos = JSON.parse(planos);
      } else {
        const result = await PlanoMedico.all();
        planos = result.toJSON();
        await Redis.set(cacheKey, JSON.stringify(planos), 'EX', 60 * 60); // Cache válido por 1 hora
      }

      return response.json(planos);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async store({ request, response }) {
    const planoData = request.only(['nome']);

    try {
      const plano = await PlanoMedico.create(planoData);

      const cacheKey = 'planos:index';
      await Redis.del(cacheKey);

      return response.created(plano);
    } catch (error) {
      console.error('Erro ao criar plano médico:', error);
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = PlanoMedicoController;
