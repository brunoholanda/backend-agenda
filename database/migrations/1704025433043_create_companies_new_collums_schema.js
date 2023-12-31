'use strict'

const BaseSchema = use('Schema')

class AddPaymentFieldsToCompaniesSchema extends BaseSchema {
  up () {
    this.table('companies', (table) => {
      table.boolean('payment_confirm') // Adicione o campo payment_confirm
      table.string('payment_email') // Adicione o campo payment_email
    })
  }

  /*
  down () {
    this.table('companies', (table) => {
      table.dropColumn('payment_confirm') // Reverta a adição do campo payment_confirm
      table.dropColumn('payment_email') // Reverta a adição do campo payment_email
    })
  }*/
}

module.exports = AddPaymentFieldsToCompaniesSchema
