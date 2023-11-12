'use strict'

const Schema = use('Schema')

class ProfessionalsSchema extends Schema {
  up () {
    this.create('professionals', (table) => {
      table.increments('id').primary()
      table.string('nome', 255).notNullable()
      table.string('cpf', 14).notNullable().unique()
      table.text('data_de_nascimento').notNullable()
      table.string('registro_profissional', 255).notNullable()
      table.string('celular', 20)
      table.text('assinatura')
      table.string('cep', 9)
      table.string('endereco', 255)
      table.string('numero', 10)
      table.text('referencia')
      table.string('cidade', 100)
      table.string('estado', 2)
      table.string('titulo', 255)
      table.integer('company_id').unsigned().references('company_id').inTable('companies')
      // Garanta que a tabela 'companies' seja criada primeiro, se ainda não existir
    })
  }

  down () {
    this.drop('professionals')
  }
}

module.exports = ProfessionalsSchema
