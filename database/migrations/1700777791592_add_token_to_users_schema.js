'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTokenFieldsToUsers extends Schema {
  up () {
    this.table('users', (table) => {
      // Adicione os campos do token e expiração do token
      table.string('token', 255).nullable();
      table.dateTime('token_expiration').nullable();
    })
  }

 /* down () {
    this.table('users', (table) => {
      // Reverta as alterações na tabela
      table.dropColumn('token');
      table.dropColumn('token_expiration');
    })
  }*/
}

module.exports = AddTokenFieldsToUsers
