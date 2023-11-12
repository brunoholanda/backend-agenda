'use strict'

const Model = use('Model')

class Company extends Model {
  // Define a tabela que este modelo representa
  static get table() {
    return 'companies'
  }

  // Define a chave primária da tabela
  static get primaryKey() {
    return 'company_id'
  }

  // Indica que o Adonis não deve gerenciar automaticamente as colunas 'created_at' e 'updated_at'
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  // Relacionamento com a tabela 'users'
  users() {
    return this.hasMany('App/Models/User')
  }

  // Aqui você pode adicionar outros métodos e propriedades conforme necessário
}

module.exports = Company
