'use strict'

const Model = use('Model')

class Endereco extends Model {
  static get table() {
    return 'professional_enderecos'
}
  professional() {
    return this.belongsTo('App/Models/Professional')
  }
}

module.exports = Endereco
