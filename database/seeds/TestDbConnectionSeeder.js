'use strict'

const Database = use('Database')

class TestDbConnectionSeeder {
  async run () {
    try {
      const users = await Database.table('users').select('*')
      console.log(users)
      console.log('Conexão com o banco de dados bem-sucedida.')
    } catch (error) {
      console.error('Falha na conexão com o banco de dados:', error)
    } finally {
      await Database.close()
    }
  }
}

module.exports = TestDbConnectionSeeder
