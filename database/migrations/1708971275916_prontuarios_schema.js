'use strict'

const Schema = use('Schema')

class ProntuariosSchema extends Schema {
  up () {
    this.create('prontuarios', (table) => {
      table.increments()
      table.string('nome', 254).notNullable()
      table.string('professional_name', 254).notNullable()
      table.timestamp('date').notNullable()
      table.text('notes').notNullable()
      table.integer('company_id').unsigned().references('company_id').inTable('companies').onDelete('CASCADE')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('prontuarios')
  }
  */
}

module.exports = ProntuariosSchema
