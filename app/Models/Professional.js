'use strict'

const Model = use('Model')

class Professional extends Model {
  static get table() {
    return 'professionals'
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  company() {
    return this.belongsTo('App/Models/Company', 'company_id', 'company_id')
  }

planosMedicos() {
  return this.belongsToMany('App/Models/PlanoMedico', 'professional_id', 'planosaude_id', 'id', 'id')
    .pivotTable('profissional_planos')
}


}

module.exports = Professional
