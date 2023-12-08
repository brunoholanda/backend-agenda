'use strict'

const Client = use('App/Models/Client')

class ClientsController {
  // Método para listar todos os clientes
  async index ({ response }) {
    const clients = await Client.all()
    return response.json(clients)
  }


  async findByCpf({ params, request, response }) {
    const company_id = request.input('company_id'); // Extrai o company_id do objeto de consulta
    const client = await Client.query()
      .where('cpf', params.cpf)
      .andWhere('company_id', company_id)
      .first();

    if (client) {
      return response.json(client);
    } else {
      return response.status(404).json({ message: 'Cliente não encontrado.' });
    }
  }

    // Função para realizar a pesquisa
    async search({ request, response }) {
      const { searchTerm, company_id } = request.get();
      if (!searchTerm) {
          return response.status(400).json({ message: 'Termo de pesquisa não fornecido.' });
      }

      // Adicionando log para monitorar as buscas
      console.log(`Search Term: ${searchTerm}, Company ID: ${company_id}`);

      const query = Client.query()
          .where('company_id', company_id)
          .andWhere(builder => {
              builder.where('cpf', 'ILIKE', `%${searchTerm}%`)
                     .orWhere('nome', 'ILIKE', `%${searchTerm}%`);
          });

          try {
            const clients = await query.fetch();
            return response.json(clients);
        } catch (error) {
            console.error('Erro na busca:', error);
            // Adicionando log para ver o erro exato
            response.status(500).send('Erro interno do servidor. Verifique os logs para mais detalhes.');
        }
  }


  async store({ request, response }) {
    try {
      const clientData = request.only(['nome', 'cpf', 'celular', 'data_nascimento', 'planodental', 'company_id']);

      // Verifique se um cliente com o mesmo CPF e company_id já existe
      const clientExists = await Client
        .query()
        .where('cpf', clientData.cpf)
        .andWhere('company_id', clientData.company_id)
        .first();

      if (clientExists) {
        return response.status(400).send({ message: 'Cliente já cadastrado para essa empresa.' });
      }

      // Se não existir, crie o cliente
      const client = await Client.create(clientData);
      return response.status(201).json(client);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return response.status(500).send('Erro interno do servidor');
    }
  }


  async show ({ params, response }) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    return response.json(client)
  }

  async update ({ params, request, response }) {
    const clientInfo = request.only(['nome', 'celular', 'data_nascimento', 'planodental'])
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    client.merge(clientInfo)
    await client.save()
    return response.status(200).json(client)
  }

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
