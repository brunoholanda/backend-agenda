'use strict'

const Schema = use('Schema')

class AddEmailToProfessionalsSchema extends Schema {
  up() {
    this.table('professionals', (table) => {
      table.string('email', 100).nullable() // Definindo o tamanho da coluna como 100
    })
  }

  /*
  down() {
    this.table('professionals', (table) => {
      table.dropColumn('email')
    })
  }
  */
}

module.exports = AddEmailToProfessionalsSchema
