'use strict'

const Client = use('App/Models/Client')
const Helpers = use('Helpers')
const fs = require('fs')

class ClientsController {
  async index({ request, response }) {
    const company_id = request.input('company_id');

    if (!company_id) {
      return response.status(400).json({ message: 'ID da empresa não fornecido.' });
    }

    try {
      const clients = await Client
        .query()
        .where('company_id', company_id)
        .fetch();

      return response.json(clients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return response.status(500).send('Erro interno do servidor');
    }
  }


  async findByCpf({ params, request, response }) {
    const company_id = request.input('company_id');
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

  async findByEmail({ params, request, response }) {
    const company_id = request.input('company_id'); // Extrai o company_id do objeto de consulta
    const client = await Client.query()
      .where('client_email', params.client_email) // Mantenha 'client_email' aqui, pois é o nome da coluna na tabela
      .andWhere('company_id', company_id)
      .first();

    if (client) {
      return response.json(client);
    } else {
      return response.status(404).json({ message: 'Cliente não encontrado.' });
    }
  }

  async search({ request, response }) {
    const { searchTerm, company_id } = request.get();
    if (!searchTerm) {
      return response.status(400).json({ message: 'Termo de pesquisa não fornecido.' });
    }

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
      response.status(500).send('Erro interno do servidor. Verifique os logs para mais detalhes.');
    }
  }

  async store({ request, response }) {
    try {
      const clientData = request.only(['nome', 'cpf', 'celular', 'data_nascimento', 'planodental', 'company_id', 'client_email', 'carteira']);

      const clientExists = await Client
        .query()
        .where('client_email', clientData.client_email)
        .andWhere('company_id', clientData.company_id)
        .first();

      if (clientExists) {
        return response.status(400).send({ message: 'Cliente já cadastrado para essa empresa.' });
      }

      const clientPhoto = request.file('client_foto', {
        types: ['image'],
        size: '1mb'
      });

      let clientPhotoPath = null;
      console.log(clientPhoto);

      if (clientPhoto) {
        const fileName = `${new Date().getTime()}.${clientPhoto.subtype}`;

        await clientPhoto.move(Helpers.publicPath('uploads/clientes'), {
          name: fileName
        });

        if (!clientPhoto.moved()) {
          return response.status(400).json({ message: clientPhoto.error() });
        }

        clientPhotoPath = `/uploads/clientes/${fileName}`;
      }

      if (clientPhotoPath) {
        clientData.client_foto = clientPhotoPath;
      }

      const client = await Client.create(clientData);
      return response.status(201).json(client);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return response.status(500).send('Erro interno do servidor');
    }
  }


  async show({ params, response }) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    return response.json(client)
  }

  async update({ params, request, response }) {
    const clientInfo = request.only(['nome', 'celular', 'data_nascimento', 'planodental', 'client_email', 'carteira']);

    const client = await Client.find(params.id);
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' });
    }

    const clientPhoto = request.file('client_foto', {
      types: ['image'],
      size: '1mb'
    });

    if (clientPhoto) {
      if (client.client_foto) {
        const existingFilePath = Helpers.publicPath(client.client_foto);
        fs.unlink(existingFilePath, (err) => {
          if (err) {
            console.error(`Falha ao apagar o arquivo antigo: ${err.message}`);
          }
        });
      }

      const fileName = `${new Date().getTime()}.${clientPhoto.subtype}`;

      await clientPhoto.move(Helpers.publicPath('uploads/clientes'), {
        name: fileName
      });

      if (!clientPhoto.moved()) {
        return response.status(400).json({ message: clientPhoto.error() });
      }

      client.client_foto = `/uploads/clientes/${fileName}`;
    }

    client.merge(clientInfo);

    await client.save();

    return response.status(200).json(client);
  }


  async destroy({ params, response }) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Cliente não encontrado.' })
    }
    await client.delete()
    return response.status(200).send({ message: 'Cliente removido com sucesso.' })
  }

  async addNotes({ params, request, response }) {
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


  async getNotes({ params, response }) {
    const client = await Client.find(params.id)

    if (!client) {
      return response.status(404).json({ message: 'Cliente não encontrado.' })
    }

    return response.status(200).json({ notes: client.notes })
  }
}

module.exports = ClientsController
