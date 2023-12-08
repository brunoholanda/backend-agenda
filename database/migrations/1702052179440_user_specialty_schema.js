'use strict'

const Schema = use('Schema')

class UserSpecialtiesSchema extends Schema {
  up () {
    this.create('user_specialties', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('specialty_id').unsigned().references('id').inTable('specialties')
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('user_specialties')
  }*/
}

module.exports = UserSpecialtiesSchema
