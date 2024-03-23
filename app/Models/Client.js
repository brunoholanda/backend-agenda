'use strict'

const Model = use('Model')
const moment = use('moment') // Certifique-se de ter o moment instalado

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

    // Defina aqui as computed properties do seu Model
    static get computed () {
        return ['formattedDateNascimento']
    }
    getFormattedDateNascimento({ data_nascimento }) {
        return data_nascimento ? moment(data_nascimento).format('DD/MM/YYYY') : null;
    }
}

module.exports = Client
