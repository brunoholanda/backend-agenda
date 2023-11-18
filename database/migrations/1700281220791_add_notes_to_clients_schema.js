'use strict'

const Schema = use('Schema')

class AddNotesToClientsSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.text('notes')
    })
  }

 /* down () {
    this.table('clients', (table) => {
      table.dropColumn('notes') // Remove a coluna 'notes' caso seja necessário reverter a migração
    })
  }*/
}

module.exports = AddNotesToClientsSchema
