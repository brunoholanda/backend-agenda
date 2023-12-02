'use strict'

const Model = use('Model')

class PlanoMedico extends Model {
  // Define a tabela correspondente no banco de dados
  static get table() {
    return 'planosaude'
  }

  // Desabilita os campos de timestamp se eles não são usados
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  // Define o relacionamento muitos-para-muitos com o modelo 'Professional'
  professionals() {
    return this.belongsToMany('App/Models/Professional')
      .pivotTable('profissional_planos') // O nome da tabela de associação
      .withTimestamps() // Se a sua tabela pivot tem campos 'created_at' e 'updated_at'
  }
}

module.exports = PlanoMedico
