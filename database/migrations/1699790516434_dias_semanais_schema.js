'use strict'

const Schema = use('Schema')

class DiasSemanaisSchema extends Schema {
  up () {
    this.create('dias_semanais', (table) => {
      table.increments('id').primary()
      table.string('dia', 10).notNullable()
      table.boolean('ativo').notNullable().defaultTo(false)
      table.time('startam').notNullable()
      table.time('endam').notNullable()
      table.time('startpm').notNullable()
      table.time('endpm').notNullable()
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
    })
  }

  down () {
    this.drop('dias_semanais')
  }
}

module.exports = DiasSemanaisSchema
