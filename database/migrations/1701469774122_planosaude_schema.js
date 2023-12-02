'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreatePlanosaudeTableSchema extends Schema {
  up () {
    this.create('planosaude', (table) => {
      table.increments()
      table.string('nome')
    })

    // Inserir dados na tabela planosaude
    return this.raw(`
      INSERT INTO planosaude (nome)
      VALUES
        ('Amil'),
        ('Bradesco Saúde'),
        ('Unimed'),
        ('SulAmérica Saúde'),
        ('Hapvida'),
        ('NotreDame Intermédica'),
        ('Prevent Senior'),
        ('Porto Seguro Saúde'),
        ('GreenLine Sistema de Saúde'),
        ('Grupo São Francisco'),
        ('Mediservice'),
        ('Santa Helena Saúde'),
        ('Caixa Seguradora Saúde'),
        ('Golden Cross'),
        ('Seguros Unimed'),
        ('One Health'),
        ('Grupo Allianz'),
        ('Sompo Saúde'),
        ('Trasmontano Saúde'),
        ('Liberty Seguros'),
        ('Mapfre Saúde'),
        ('Biovida Saúde'),
        ('Sami Saúde'),
        ('São Cristóvão Saúde'),
        ('Santa Tereza Saúde'),
        ('Paraná Clínicas'),
        ('Saúde Sim'),
        ('Affix Saúde'),
        ('Agemed Saúde'),
        ('Ameplan Saúde'),
        ('Benevix'),
        ('Care Plus'),
        ('Clinipam'),
        ('Conmed Saúde'),
        ('Doctor Clin'),
        ('GNDI (Grupo NotreDame Intermédica)'),
        ('Life Day Saúde'),
        ('Plano São Lucas Saúde'),
        ('Serpram'),
        ('Total MedCare'),
        ('Plamed Saúde'),
        ('Plan Assiste'),
        ('Promed Assistência Médica'),
        ('Saúde Beneficência Portuguesa'),
        ('Saúde Bradesco'),
        ('São Bernardo Saúde'),
        ('Saúde Caixa'),
        ('São Francisco Saúde'),
        ('Saúde Itaú'),
        ('São Miguel Saúde'),
        ('Seisa Saúde'),
        ('Serra Saúde'),
        ('Sinam'),
        ('Smile Saúde'),
        ('SPTrans'),
        ('SulAmérica Saúde'),
        ('Transmontano Saúde'),
        ('Unafisco Saúde'),
        ('Unihosp Saúde'),
        ('Universal Saúde'),
        ('Vale Saúde'),
        ('Vitallis Saúde'),
        ('Amil Dental'),
        ('Bradesco Dental'),
        ('OdontoPrev'),
        ('SulAmérica Odonto'),
        ('Unimed Odonto'),
        ('MetLife Dental'),
        ('Interodonto'),
        ('Porto Seguro Odontológico'),
        ('NotreDame Odontológica'),
        ('DentalCorp'),
        ('Prodent'),
        ('Docctor Med Odonto'),
        ('Inpao Dental'),
        ('Odontosystem'),
        ('Uniodonto'),
        ('OdontoCompany'),
        ('Dental Uni'),
        ('Dentistas Associados'),
        ('Odonto Serv'),
        ('Odonto Empresas'),
        ('Dental Par'),
        ('GreenLine Odontológico'),
        ('Ideal Odonto'),
        ('Liberty Dental'),
        ('Odonto Santander'),
        ('Sorriso Assistência Odontológica'),
        ('Saúde Caixa Odonto'),
        ('SulAmérica Odonto PME'),
        ('Uniodonto Paulista'),
        ('Vale Dental'),
        ('Particular')
    `)
  }
/*
  down () {
    this.drop('planosaude')
  }*/
}

module.exports = CreatePlanosaudeTableSchema
