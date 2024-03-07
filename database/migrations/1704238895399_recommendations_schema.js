'use strict'

const Schema = use('Schema')

class RecommendationsSchema extends Schema {
  up () {
    this.create('recommendations', (table) => {
      table.increments()
      table.string('company_name', 255).notNullable()
      table.integer('company_id').unsigned().references('company_id').inTable('companies') // Correção na referência e permitido nulo
      table.string('indicated', 255).notNullable()
      table.string('especialidade', 255).notNullable()
      table.string('telefone', 20).notNullable()
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('recommendations')
  }
  */
}

module.exports = RecommendationsSchema
