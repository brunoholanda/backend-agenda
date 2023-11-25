'use strict'

const Schema = use('Schema')

class AddPasswordResetToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // add new columns
      table.string('reset_token', 255).nullable()
      table.dateTime('token_expires_at').nullable()
    })
  }

/*  down () {
    this.table('users', (table) => {
      // reverse new columns
      table.dropColumn('reset_token')
      table.dropColumn('token_expires_at')
    })
  }*/
}

module.exports = AddPasswordResetToUsersSchema
