'use strict'

const Schema = use('Schema')

class AddServiceIdToCompaniesSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      // adiciona a coluna service_id
      table.integer('service_id').unsigned().references('id').inTable('services')
    })
  }
/*
  down () {
    this.table('companies', (table) => {
      // desfaz a adição da coluna service_id
      table.dropColumn('service_id')
    })
  }*/
}

module.exports = AddServiceIdToCompaniesSchema
