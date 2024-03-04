'use strict'

const Schema = use('Schema')

class AddImagePathToChamadosSchema extends Schema {
  up () {
    this.table('chamados', (table) => {
      table.text('image_path').nullable()
    })
  }

  down () {
    this.table('chamados', (table) => {
      table.dropColumn('image_path')
    })
  }
}

module.exports = AddImagePathToChamadosSchema
