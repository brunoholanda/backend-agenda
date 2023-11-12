'use strict'

const Schema = use('Schema')

class CompaniesSchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments('company_id').primary()
      table.string('nome', 255).notNullable()
      table.string('cnpj', 18).notNullable().unique()
      // O método .unique() garante que não haverá CNPJs duplicados
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompaniesSchema
