'use strict'

const Schema = use('Schema')

class CreateUnaccentExtension extends Schema {
  async up () {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS unaccent;')
  }

  async down () {
    // Atenção: A remoção de extensões pode ter impactos em seu banco de dados.
    // Tenha certeza antes de decidir removê-la. O comando abaixo é apenas um exemplo.
    // await this.db.raw('DROP EXTENSION IF EXISTS unaccent;')
  }
}

module.exports = CreateUnaccentExtension
