const LogAtestado = use('App/Models/LogAtestado')

class LogAtestadoController {
  async store ({ request }) {
    const data = request.only(['text'])
    const logAtestado = await LogAtestado.create(data)
    return logAtestado
  }
}

module.exports = LogAtestadoController
