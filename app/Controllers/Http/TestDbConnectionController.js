'use strict'

const Database = use('Database')

class TestDbConnectionController {
  async index ({ response }) {
    try {
      const users = await Database.table('users').select('*')
      return response.send(users)
    } catch (error) {
      return response.status(500).send('Falha na conexão com o banco de dados: ' + error.message)
    }
  }
}

module.exports = TestDbConnectionController
