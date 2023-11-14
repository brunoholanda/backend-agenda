'use strict'

const Model = use('Model')

class Client extends Model {
  // Relacionamento com a tabela de agendamentos

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
  appointments () {
    return this.hasMany('App/Models/Agendamento')
  }
}

module.exports = Client
