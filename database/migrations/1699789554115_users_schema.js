'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('updated_at').defaultTo(this.fn.now())
      table.integer('company_id').unsigned().references('company_id').inTable('companies')
      // Ajuste o nome da tabela 'companies' conforme o necessário
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
