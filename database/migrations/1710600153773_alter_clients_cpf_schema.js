'use strict'

const Schema = use('Schema')

class AlterClientsCpfSchema extends Schema {
  up () {
    this.alter('clients', (table) => {
      table.string('cpf', 14).nullable().alter()
    })
  }

  down () {
    this.alter('clients', (table) => {
      table.string('cpf', 14).notNullable().alter()
    })
  }
}

module.exports = AlterClientsCpfSchema
