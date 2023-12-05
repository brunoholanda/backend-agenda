'use strict'

const Schema = use('Schema')

class AlterClientsTableSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.dropUnique('cpf')

      table.unique(['cpf', 'company_id'])
    })
  }

  down () {
    this.table('clients', (table) => {
      table.dropUnique(['cpf', 'company_id'])

      table.unique('cpf')
    })
  }
}

module.exports = AlterClientsTableSchema
