'use strict'

const Model = use('Model')

class PlanoMedico extends Model {
  static get table() {
    return 'planosaude'
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

professionals() {
  return this.belongsToMany('App/Models/Professional', 'planosaude_id', 'professional_id', 'id', 'id')
    .pivotTable('profissional_planos')
}


}

module.exports = PlanoMedico
