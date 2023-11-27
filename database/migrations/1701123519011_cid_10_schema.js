'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidSchema extends Schema {
  up () {
    this.create('cid10', (table) => {
      table.string('code', 10).primary();
      table.text('description');
      table.text('descriptiontwo');
    });

  }

 /* down () {
    this.drop('cids')
  }*/
}

module.exports = CidSchema
