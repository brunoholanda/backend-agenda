'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCompanyIdToClientsSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.integer('company_id').unsigned().references('company_id').inTable('companies');
    });
  }
/*
  down () {
    this.table('add_company_id_to_clients', (table) => {
      // reverse alternations
    })
  }*/
}

module.exports = AddCompanyIdToClientsSchema
