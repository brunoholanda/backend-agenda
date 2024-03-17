'use strict'

const Schema = use('Schema')

class AddPasswordResetToProfessionalsSchema extends Schema {
  up () {
    this.table('professionals', (table) => {
      // add new columns
      table.string('reset_token', 255).nullable()
      table.dateTime('token_expires_at').nullable()
    })
  }

/*  down () {
    this.table('professionals', (table) => {
      // reverse new columns
      table.dropColumn('reset_token')
      table.dropColumn('token_expires_at')
    })
  }*/
}

module.exports = AddPasswordResetToProfessionalsSchema
