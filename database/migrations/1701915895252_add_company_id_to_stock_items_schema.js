'use strict'

const Schema = use('Schema')

class AddCompanyIdToStockItemsSchema extends Schema {
  up () {
    this.table('stock_items', (table) => {
      table.integer('company_id').unsigned().references('company_id').inTable('companies');
    })
  }
/*
  down () {
    this.table('stock_items', (table) => {
      // reverse alternations
      table.dropColumn('company_id');
    })
  }*/
}

module.exports = AddCompanyIdToStockItemsSchema
