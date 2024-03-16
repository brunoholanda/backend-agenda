'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCompanyIdToPublicProfessionalsSchema extends Schema {
  up () {
    this.table('public_professionals', (table) => {
      table.integer('company_id').unsigned().references('company_id').inTable('companies')
    })
  }

  /*
  down () {
    this.drop('public_professionals')
  }*/
}

module.exports = AddCompanyIdToPublicProfessionalsSchema
