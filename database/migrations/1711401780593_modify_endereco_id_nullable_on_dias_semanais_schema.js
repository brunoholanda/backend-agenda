'use strict'

const Schema = use('Schema')

class ModifyEnderecoIdNullableOnDiasSemanaisSchema extends Schema {
  up () {
    this.alter('dias_semanais', (table) => {
      table.integer('endereco_id').unsigned().nullable().alter()
    })
  }

  down () {
    this.alter('dias_semanais', (table) => {
      table.integer('endereco_id').unsigned().notNullable().alter()
    })
  }
}

module.exports = ModifyEnderecoIdNullableOnDiasSemanaisSchema
