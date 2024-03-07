'use strict'

const Schema = use('Schema')

class ContabilidadeSchema extends Schema {
  up () {
    this.create('contabilidades', (table) => {
      table.increments()
      table.float('receita').nullable() // Alterado para permitir nulo
      table.string('descricao_receita', 254).nullable() // Alterado para permitir nulo
      table.boolean('recorrencia_receita').defaultTo(false)
      table.integer('recorrencia_qt_receita').unsigned().nullable() // Alterado para permitir nulo
      table.float('despesa').nullable() // Alterado para permitir nulo
      table.string('descricao_despesa', 254).nullable() // Alterado para permitir nulo
      table.boolean('recorrencia_despesa').defaultTo(false)
      table.integer('recorrencia_qt_despesa').unsigned().nullable() // Alterado para permitir nulo
      table.integer('company_id').unsigned().references('company_id').inTable('companies') // Correção na referência e permitido nulo
      table.timestamps()
    })
  }
  /*
  down () {
    this.drop('contabilidades')
  }
  */
}

module.exports = ContabilidadeSchema
