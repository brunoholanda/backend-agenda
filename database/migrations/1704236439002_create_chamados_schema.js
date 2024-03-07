'use strict'

const Schema = use('Schema')

class ChamadosSchema extends Schema {
  up () {
    this.create('chamados', (table) => {
      table.increments()
      table.string('company_name', 255).notNullable()
      table.string('type', 80).notNullable()
      table.text('description').notNullable()
      table.string('ticket_number', 80).notNullable().unique()
      table.integer('status')
      table.text('answer')
      table.integer('company_id').unsigned().references('company_id').inTable('companies') // Correção na referência e permitido nulo
      table.timestamps()
    })
  }

  /*
  down () {
    this.drop('chamados')
  }
  */
}

module.exports = ChamadosSchema
