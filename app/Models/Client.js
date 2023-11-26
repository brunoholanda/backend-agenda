'use strict'

const Model = use('Model')

class Client extends Model {

    static get createdAtColumn() {
        return 'created_at'
    }

    static get updatedAtColumn() {
        return 'updated_at'
    }

    appointments() {
        return this.hasMany('App/Models/Agendamento', 'id', 'client_id')
    }

    company() {
        return this.belongsTo('App/Models/Company', 'company_id', 'company_id')
    }
}

module.exports = Client
