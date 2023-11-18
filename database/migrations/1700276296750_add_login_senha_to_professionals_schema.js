'use strict'

const Schema = use('Schema')

class AddLoginSenhaToProfessionalsSchema extends Schema {
  up() {
    this.table('professionals', (table) => {
      table.string('login', 80).unique();
      table.string('senha', 60); // Removido o .notNullable() inicialmente
    })


  }

  /*down() {
    this.table('professionals', (table) => {
      // Reverte as alterações
      table.dropColumn('login')
      table.dropColumn('senha')
    })
  }*/
}

module.exports = AddLoginSenhaToProfessionalsSchema
