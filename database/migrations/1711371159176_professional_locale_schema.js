'use strict'

const Schema = use('Schema')

class EnderecosSchema extends Schema {
  up () {
    this.create('professional_enderecos', (table) => {
      table.increments()
      table.integer('professional_id').unsigned().references('id').inTable('professionals')
      table.string('cep', 9)
      table.string('rua')
      table.string('numero')
      table.string('referencia').nullable()
      table.string('uf', 2)
      table.string('cidade')
      table.string('bairro')
      table.boolean('multiplo').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('professional_enderecos')
  }
}

module.exports = EnderecosSchema
