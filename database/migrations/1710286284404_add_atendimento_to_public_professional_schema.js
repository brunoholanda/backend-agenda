'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddAtendimentoToPublicProfessionalSchema extends Schema {
  up () {
    this.table('public_professionals', (table) => {
      table.string('atendimento', 1)
    })
  }

  down () {
    this.table('public_professionals', (table) => {
      table.dropColumn('atendimento')
    })
  }
}

module.exports = AddAtendimentoToPublicProfessionalSchema
