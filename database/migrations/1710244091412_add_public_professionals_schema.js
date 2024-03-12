'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddPublicProfessionalsSchema extends Schema {
  up () {
    this.create('public_professionals', (table) => {
      table.increments('id').primary();
      table.string('nome', 255);
      table.string('telefone', 20);
      table.string('email', 100);
      table.string('especialidade', 255);
      table.string('registro_profissional', 50);
      table.string('titulo', 255);
      table.string('planos_que_atende');
      table.string('endereco', 150);
      table.string('numero', 20);
      table.string('bairro', 50);
      table.string('cidade', 50);
      table.string('uf', 2);
      table.integer('cep');
      table.string('instagram', 100);
      table.string('foto', 255);
      table.timestamps();
    })
  }

  /*
  down () {
    this.drop('public_professionals')
  }
  */
}

module.exports = AddPublicProfessionalsSchema
