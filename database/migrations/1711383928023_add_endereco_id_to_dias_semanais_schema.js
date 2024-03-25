'use strict'

const Schema = use('Schema')

class AddEnderecoIdToDiasSemanaisSchema extends Schema {
  up () {
    this.table('dias_semanais', (table) => {
      // Adicionando a coluna endereco_id
      table.integer('endereco_id').unsigned().references('id').inTable('professional_enderecos').onDelete('CASCADE')
    })
  }

  down () {
    this.table('dias_semanais', (table) => {
      // Removendo a coluna caso a migration seja revertida
      table.dropColumn('endereco_id')
    })
  }
}

module.exports = AddEnderecoIdToDiasSemanaisSchema
