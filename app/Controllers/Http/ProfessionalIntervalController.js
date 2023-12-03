'use strict'

const ProfessionalInterval = use('App/Models/ProfessionalInterval')

class ProfessionalIntervalController {
  async index ({ response }) {
    const intervals = await ProfessionalInterval.query()
      .with('professional')
      .fetch()

    return response.json(intervals)
  }

  async store({ request, response }) {
    const data = request.only(['intervalo', 'professional_id']);

    const interval = await ProfessionalInterval
      .query()
      .where('professional_id', data.professional_id)
      .first();

    if (interval) {
      interval.merge(data);
      await interval.save();
      return response.json(interval);
    } else {
      const newInterval = await ProfessionalInterval.create(data);
      return response.status(201).json(newInterval);
    }
  }

  async show ({ params, response }) {
    const interval = await ProfessionalInterval.findOrFail(params.id)

    return response.json(interval)
  }

  async findByProfessionalId({ params, response }) {
    const { professional_id } = params;

    const interval = await ProfessionalInterval
      .query()
      .where('professional_id', professional_id)
      .first();

    if (!interval) {
      return response.status(404).send({
        message: `Nenhum intervalo encontrado para o professional_id: ${professional_id}`
      });
    }

    return response.json(interval);
  }


  async update ({ params, request, response }) {
    const interval = await ProfessionalInterval.findOrFail(params.id)
    const data = request.only(['intervalo', 'professional_id'])

    interval.merge(data)
    await interval.save()

    return response.json(interval)
  }

  async destroy ({ params, response }) {
    const interval = await ProfessionalInterval.findOrFail(params.id)

    await interval.delete()

    return response.status(204).send()
  }
}

module.exports = ProfessionalIntervalController
