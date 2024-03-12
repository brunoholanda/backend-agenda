'use strict'

const Schema = use('Schema')

class AddProfessionalIdToPublicProfessionalsSchema extends Schema {
  up () {
    this.table('public_professionals', (table) => {
      table.integer('professional_id').unsigned().after('id')
      table.foreign('professional_id').references('professionals.id').onDelete('CASCADE')
    })
  }

  /*
  down () {
    this.table('public_professionals', (table) => {
      table.dropForeign('professional_id')
      table.dropColumn('professional_id')
    })
  }
  */
}

module.exports = AddProfessionalIdToPublicProfessionalsSchema
