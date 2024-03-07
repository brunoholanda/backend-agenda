'use strict'

const Schema = use('Schema')

class AddStatusToRecommendationsSchema extends Schema {
  up() {
    this.table('recommendations', (table) => {
      table.string('status').nullable()
      table.text('motivo').nullable()
    })
  }
  /*
    down () {
      this.table('recommendations', (table) => {
        table.string('status').nullable()
        table.text('motivo').nullable()    })
    }
    */
}

module.exports = AddStatusToRecommendationsSchema
