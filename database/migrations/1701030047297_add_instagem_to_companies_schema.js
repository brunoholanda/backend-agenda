'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddInstagemToCompaniesSchema extends Schema {
  up () {
    this.table('companies', (table) => {
      table.string('instagram').nullable(); // Adiciona a coluna logo_path que pode ser nula
    });
  }
/*
  down () {
    this.drop('add_instagem_to_companies')
  }*/
}

module.exports = AddInstagemToCompaniesSchema
