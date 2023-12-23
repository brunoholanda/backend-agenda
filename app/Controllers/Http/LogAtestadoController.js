const LogAtestado = use('App/Models/LogAtestado')

class LogAtestadoController {
  async store({ request }) {
    const data = request.only(['text'])
    const logAtestado = await LogAtestado.create(data)
    return logAtestado
  }

  async show({ params, response }) {
    try {
      const atestado = await LogAtestado.findOrFail(params.id);
      return response.json(atestado);
    } catch (error) {
      return response.status(404).json({ message: 'Atestado não encontrado.' });
    }
  }
}

module.exports = LogAtestadoController
