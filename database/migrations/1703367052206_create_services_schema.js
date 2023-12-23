'use strict'

const Schema = use('Schema')

class ServicesSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('plan').notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.decimal('originalPrice', 10, 2)
      table.integer('persons').notNullable()
      table.integer('duration').notNullable() // considere em meses
      table.boolean('mostSold').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServicesSchema
