'use strict'

const Schema = use('Schema')

class AgendamentosSchema extends Schema {
  up () {
    this.create('agendamentos', (table) => {
      table.increments('id').primary()
      table.text('nome').notNullable()
      table.text('data').notNullable()
      table.text('horario').notNullable()
      table.text('planodental').notNullable()
      table.text('celular').notNullable()
      table.text('motivo').notNullable()
      table.string('cpf', 14).notNullable()
      table.integer('status').notNullable()
      table.text('infoadicional')
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
    })
  }

  down () {
    this.drop('agendamentos')
  }
}

module.exports = AgendamentosSchema
