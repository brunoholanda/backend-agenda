'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  company() {
    return this.belongsTo('App/Models/Company')
  }

  static get hidden () {
    return ['password'] // Esconder a senha nas consultas
  }}

module.exports = User
