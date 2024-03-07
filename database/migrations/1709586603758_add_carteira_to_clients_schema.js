'use strict'

const Schema = use('Schema')

class AddCarteiraToClientsSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.string('carteira').nullable()
    })
  }
 /*
  down () {
    this.table('clients', (table) => {
      table.dropColumn('carteira')
    })
  }
  */
}

module.exports = AddCarteiraToClientsSchema
