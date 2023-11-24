'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddContatoToCompaniesSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      // Adicionando a coluna telefone
      table.string('telefone')
      // Adicionando a coluna endereco
      table.string('endereco')
    })
  }

  down () {
    this.table('companies', (table) => {
      // Removendo a coluna telefone
      table.dropColumn('telefone')
      // Removendo a coluna endereco
      table.dropColumn('endereco')
    })
  }
}


module.exports = AddContatoToCompaniesSchema
