'use strict'

const Schema = use('Schema')

class UpdateCpfSizeOnProfessionalsSchema extends Schema {
  up () {
    this.table('professionals', (table) => {
      // alter table
      table.string('cpf', 15).alter()
    })
  }

  down () {
    this.table('professionals', (table) => {
      // reverse alternations
      table.string('cpf', 14).alter() // Supondo que o tamanho original era 14
    })
  }
}

module.exports = UpdateCpfSizeOnProfessionalsSchema
