'use strict'

const Schema = use('Schema')

class AlterTelefoneInNpsSystemsSchema extends Schema {
  up () {
    this.table('nps_systems', (table) => {
      // alter table
      table.string('telefone', 254).alter() // Especifica um tamanho máximo para o VARCHAR, 254 é um valor comum
    })
  }
/*
  down () {
    this.table('nps_systems', (table) => {
      // reverse alternations
      table.integer('telefone').alter() // Reverte para integer se necessário
    })
  }*/
}

module.exports = AlterTelefoneInNpsSystemsSchema
