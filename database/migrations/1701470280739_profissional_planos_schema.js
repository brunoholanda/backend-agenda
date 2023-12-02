'use strict'

const Schema = use('Schema')

class ProfissionalPlanosSchema extends Schema {
  up () {
    this.create('profissional_planos', (table) => {
      table.increments()
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
      table.integer('planosaude_id').unsigned().references('id').inTable('planosaude')
    })
  }
/*
  down () {
    this.drop('profissional_planos')
  }*/
}

module.exports = ProfissionalPlanosSchema
