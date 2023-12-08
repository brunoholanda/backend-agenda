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

  specialties() {
    return this.belongsToMany('App/Models/Specialty', 'user_id', 'specialty_id', 'id', 'id').pivotTable('user_specialties')
  }

  static get hidden () {
    return ['password'] // Esconder a senha nas consultas
  }}

module.exports = User
