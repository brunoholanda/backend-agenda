'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLogoPathToCompaniesSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      table.string('logo_path').nullable(); // Adiciona a coluna logo_path que pode ser nula
    });
  }

/*  down () {
    this.drop('add_logo_path_to_companies')
  }*/
}

module.exports = AddLogoPathToCompaniesSchema
