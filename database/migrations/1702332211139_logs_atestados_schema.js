'use strict'

const Schema = use('Schema')

class LogsAtestadosSchema extends Schema {
  up () {
    this.create('logs_atestados', (table) => {
      table.increments()
      table.string('text').notNullable()
      table.timestamps()
    })
  }
/*
  down () {
    this.drop('logs_atestados')
  }*/
}

module.exports = LogsAtestadosSchema
