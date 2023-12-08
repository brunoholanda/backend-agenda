'use strict'

const Model = use('Model')

class Specialty extends Model {
  // Defina a relação inversa aqui
  users() {
    return this.belongsToMany('App/Models/User', 'specialty_id', 'user_id', 'id', 'id').pivotTable('user_specialties')
  }
}

module.exports = Specialty
