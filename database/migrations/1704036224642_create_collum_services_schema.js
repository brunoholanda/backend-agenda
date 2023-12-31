'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCollumServicesSchema extends Schema {
  up () {
    this.table('services', (table) => {
      table.string('preapproval_plan_id') // Adicione o campo payment_email
    })
  }
/*
  down () {
    this.drop('create_collum_services')
  }*/
}

module.exports = CreateCollumServicesSchema
