'use strict'

const Model = use('Model')

class ProfessionalInterval extends Model {

 professional () {
    return this.belongsTo('App/Models/Professional')
  }
}

module.exports = ProfessionalInterval
