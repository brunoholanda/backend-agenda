'use strict'

const Schema = use('Schema')

class AddServiceIdToCompaniesSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      // adiciona a coluna service_id
      table.string('payment_type')
    })
  }
/*
  down () {
    this.table('companies', (table) => {
      // desfaz a adição da coluna payment_type
      table.dropColumn('payment_type')
    })
  }*/
}

module.exports = AddServiceIdToCompaniesSchema
