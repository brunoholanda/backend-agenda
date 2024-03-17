'use strict'

const Schema = use('Schema')

class UpdateCpfToEmailSchema extends Schema {
  up () {
    this.alter('agendamentos', (table) => {
      table.renameColumn('cpf', 'email')
    })

    this.alter('agendamentos', (table) => {
      table.string('email', 254).notNullable().alter()
    })
  }

  down () {
    this.alter('agendamentos', (table) => {
      table.string('cpf', 14).notNullable().alter()
    })

    this.alter('agendamentos', (table) => {
      table.renameColumn('email', 'cpf')
    })
  }
}

module.exports = UpdateCpfToEmailSchema
