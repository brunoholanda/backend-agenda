'use strict'

const Schema = use('Schema')

class ClientsSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments()
      table.string('nome', 255).notNullable()
      table.string('cpf', 14).unique().notNullable() // CPF como chave única para evitar duplicatas
      table.string('celular', 20).notNullable()
      table.date('data_nascimento').nullable() // Permitir nulo para data de nascimento
      table.string('planodental').nullable() // Permitir nulo para plano dental, caso queira que seja obrigatório, remova o .nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientsSchema
