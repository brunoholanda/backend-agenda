'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCollumServicesSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.string('client_email') // Adicione o campo payment_email
    })
  }
/*
  down () {
    this.drop('create_collum_services')
  }*/
}

module.exports = CreateCollumServicesSchema
