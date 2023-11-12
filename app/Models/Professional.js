'use strict'

const Model = use('Model')

class Professional extends Model {
  // Opcional: Definir a tabela que este modelo irá utilizar
  static get table() {
    return 'professionals'
  }

  // Opcional: Definir como o Adonis trata os campos de data (created_at e updated_at)
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  // Relacionamento com a tabela 'companies' (se houver)
  company() {
    return this.belongsTo('App/Models/Company', 'company_id', 'company_id')
  }

  // Outros métodos e lógica do modelo podem ser adicionados aqui
}

module.exports = Professional
