'use strict'

const Schema = use('Schema')

class NpsSystemSchema extends Schema {
  up () {
    this.create('nps_systems', (table) => {
      table.increments()
      table.string('nome', 254).notNullable()
      table.integer('telefone').nullable()
      table.integer('nota').notNullable()
      table.integer('company_id').unsigned().references('company_id').inTable('companies').onDelete('CASCADE')
      table.timestamps()
    })
  }

  /*
  down () {
    this.drop('nps_systems') // Método para reverter a migration (deletar a tabela)
  }
  */
}

module.exports = NpsSystemSchema
