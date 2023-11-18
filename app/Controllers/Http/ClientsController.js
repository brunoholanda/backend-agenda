'use strict'

const Client = use('App/Models/Client')

class ClientsController {
  // Método para listar todos os clientes
  async index ({ response }) {
    const clients = await Client.all()
    return response.json(clients)
  }

  async findByCpf({ params, response }) {
    const client = await Client.query()
      .where('cpf', params.cpf)
      .first();

    if (client) {
      return response.json(client);
    } else {
      return response.status(404).json({ message: 'Cliente não encontrado.' });
    }
  }
  // Método para criar um novo cliente
  async store ({ request, response }) {
    try {
      console.log('Dados recebidos:', request.all());

      const clientData = request.only(['nome', 'cpf', 'celular', 'data_nascimento', 'planodental'])
      console.log('Dados do cliente:', clientData);

      // Verifique se o cliente já existe
      const clientExists = await Client.findBy('cpf', clientData.cpf)
      if (clientExists) {
        console.log('Cliente já existe com CPF:', clientData.cpf);
        return response.status(400).send({ message: 'Cliente já cadastrado.' })
      }

      const client = await Client.create(clientData)
      console.log('Cliente criado com sucesso:', client.id);
      return response.status(201).json(client)
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return response.status(500).send('Erro interno do servidor');
    }
  }


  // Método para exibir um único cliente
  async show ({ params, response }) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    return response.json(client)
  }

  // Método para atualizar um cliente existente
  async update ({ params, request, response }) {
    const clientInfo = request.only(['nome', 'celular', 'data_nascimento', 'plano_dental'])
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    client.merge(clientInfo)
    await client.save()
    return response.status(200).json(client)
  }

  // Método para excluir um cliente
  async destroy ({ params, response }) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    await client.delete()
    return response.status(200).send({ message: 'Cliente removido com sucesso.' })
  }

  async addNotes ({ params, request, response }) {
    try {
      const { notes } = request.only(['notes'])
      const client = await Client.find(params.id)

      if (!client) {
        return response.status(404).json({ message: 'Cliente não encontrado.' })
      }
        client.notes = notes
      await client.save()

      return response.status(200).json(client)
    } catch (error) {
      console.error('Erro ao adicionar/atualizar observações do cliente:', error)
      return response.status(500).json({ error: 'Erro interno do servidor' })
    }
  }


  async getNotes ({ params, response }) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.status(404).json({ message: 'Cliente não encontrado.' })
    }

    return response.status(200).json({ notes: client.notes })
  }
}

module.exports = ClientsController
