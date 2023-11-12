'use strict'

const Schema = use('Schema')

class DiasSemanaisSchema extends Schema {
  up () {
    this.create('dias_semanais', (table) => {
      table.increments('id').primary()
      table.string('dia', 10).notNullable()
      table.boolean('ativo').notNullable().defaultTo(false)
      table.time('startam').nullable() // Alterado para permitir null
      table.time('endam').nullable()   // Alterado para permitir null
      table.time('startpm').nullable() // Alterado para permitir null
      table.time('endpm').nullable()   // Alterado para permitir null
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
  })

  }

  down () {
    this.drop('dias_semanais')
  }
}

module.exports = DiasSemanaisSchema
