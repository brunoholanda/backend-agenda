'use strict'

const Client = use('App/Models/Client')

class ClientController {
  async store ({ request, response }) {
    try {
      const data = request.only(['nome', 'cpf', 'celular', 'data_nascimento', 'planodental'])

      // Verificar se o cliente já existe pelo CPF
      const existingClient = await Client.findBy('cpf', data.cpf)

      if (existingClient) {
        // Cliente já existe, não é necessário cadastrá-lo novamente
        return response.status(200).json(existingClient)
      }

      // Cliente não existe, criar um novo cliente
      const client = await Client.create(data)

      return response.status(201).json(client)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Erro ao cadastrar cliente' })
    }
  }
}

module.exports = ClientController
