'use strict'

const Schema = use('Schema')

class AddImagePathToClientsSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.text('client_foto').nullable()
    })
  }
/*
  down () {
    this.table('clients', (table) => {
      table.dropColumn('client_foto')
    })
  }
  */
}

module.exports = AddImagePathToClientsSchema
