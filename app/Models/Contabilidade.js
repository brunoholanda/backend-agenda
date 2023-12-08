'use strict'

const Model = use('Model')

class Contabilidade extends Model {
  company() {
    return this.belongsTo('App/Models/Company')
  }
}

module.exports = Contabilidade
