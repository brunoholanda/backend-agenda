'use strict'

const Schema = use('Schema')

class AddClientIdToAppointmentsSchema extends Schema {
  up () {
    this.table('agendamentos', (table) => {
      table.integer('client_id').unsigned().references('id').inTable('clients')
    })
  }

 /* down () {
    this.table('agendamentos', (table) => {
      // Remove a coluna client_id
      table.dropColumn('client_id')
    })
  }*/
}

module.exports = AddClientIdToAppointmentsSchema
