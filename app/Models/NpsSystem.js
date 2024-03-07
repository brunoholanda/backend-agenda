'use strict'

const Model = use('Model')

class NpsSystem extends Model {
  // Relação com a tabela companies
  company() {
    return this.belongsTo('App/Models/Company', 'company_id', 'company_id')
  }
}

module.exports = NpsSystem
