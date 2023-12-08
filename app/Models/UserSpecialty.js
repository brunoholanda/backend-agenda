'use strict'

const Model = use('Model')

class UserSpecialty extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  specialty () {
    return this.belongsTo('App/Models/Specialty')
  }
}

module.exports = UserSpecialty
