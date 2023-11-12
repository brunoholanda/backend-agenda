'use strict'

const Model = use('Model')

class Agendamento extends Model {
  // Opcional: Definir a tabela que este modelo irá utilizar
  static get table() {
    return 'agendamentos'
  }

  // Opcional: Definir como o Adonis trata os campos de data (created_at e updated_at)
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  // Relacionamento com a tabela 'professionals' (se houver)
  professional() {
    return this.belongsTo('App/Models/Professional')
  }

  // Outros métodos e lógica do modelo podem ser adicionados aqui
}

module.exports = Agendamento
