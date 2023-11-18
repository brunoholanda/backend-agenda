'use strict'

const Model = use('Model')

class Client extends Model {
    // Se você tiver timestamps (created_at e updated_at) em sua tabela, o Adonis os gerenciará automaticamente
    // Caso contrário, você deve desabilitar os timestamps
    static get createdAtColumn() {
        return 'created_at'
    }

    static get updatedAtColumn() {
        return 'updated_at'
    }

    // Relacionamento com a tabela de agendamentos
    appointments () {
        // Assumindo que o modelo de agendamento é 'Appointment' e tem a chave estrangeira 'client_id'
        return this.hasMany('App/Models/Agendamento', 'id', 'client_id')
    }
}

module.exports = Client
