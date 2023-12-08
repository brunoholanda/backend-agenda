'use strict'

const Schema = use('Schema')

class SpecialtiesTableSchema extends Schema {
  up () {
    this.create('specialties', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('specialties')
  }*/
}

module.exports = SpecialtiesTableSchema
