'use strict'

const Model = use('Model')

class Company extends Model {
  users() {
    return this.hasMany('App/Models/User')
  }

  // Outros métodos e propriedades
}

module.exports = Company
