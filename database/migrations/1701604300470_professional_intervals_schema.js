'use strict'

const Schema = use('Schema')

class ProfessionalIntervalsSchema extends Schema {
  up () {
    this.create('professional_intervals', (table) => {
      table.increments()
      table.string('intervalo').notNullable()
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('professional_intervals')
  }*/
}

module.exports = ProfessionalIntervalsSchema
