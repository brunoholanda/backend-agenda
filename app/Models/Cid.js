'use strict'

const Model = use('Model')

class Cid extends Model {
  static get table() {
    return 'cid10'
  }

  static get primaryKey() {
    return 'code'
  }
}

module.exports = Cid
