'use strict'

const Schema = use('Schema')

class StockItemsSchema extends Schema {
  up () {
    this.create('stock_items', (table) => {
      table.increments()
      table.string('nome', 80).notNullable()
      table.integer('quantidade').unsigned().notNullable()
      table.integer('limite_estoque').unsigned().notNullable()
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('stock_items')
  }*/
}

module.exports = StockItemsSchema
