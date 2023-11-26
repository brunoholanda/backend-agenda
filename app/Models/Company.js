'use strict'

const Model = use('Model')

class Company extends Model {
    static get table() {
        return 'companies'
    }

    static get primaryKey() {
        return 'company_id'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    // Relacionamento com User
    users() {
        return this.hasMany('App/Models/User')
    }

    // Relacionamento com Client
    clients() {
        return this.hasMany('App/Models/Client', 'company_id', 'company_id')
    }
}

module.exports = Company
