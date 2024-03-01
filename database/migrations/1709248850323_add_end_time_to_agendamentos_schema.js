'use strict'

const Schema = use('Schema')

class AddEndTimeToAgendamentosSchema extends Schema {
  up () {
    this.table('agendamentos', (table) => {
      table.text('end_time').after('horario').nullable()
    })
  }

  down () {
    this.table('agendamentos', (table) => {
      table.dropColumn('end_time')
    })
  }
}

module.exports = AddEndTimeToAgendamentosSchema
