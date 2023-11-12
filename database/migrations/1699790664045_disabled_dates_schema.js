'use strict'

const Schema = use('Schema')

class DisabledDatesSchema extends Schema {
  up () {
    this.create('disabled_dates', (table) => {
      table.increments('id').primary()
      table.string('date', 10).notNullable()
      table.boolean('allday').notNullable().defaultTo(false)
      table.time('starttime')
      table.time('endtime')
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
    })
  }

  down () {
    this.drop('disabled_dates')
  }
}

module.exports = DisabledDatesSchema
