// app/Models/Weekday.js

'use strict'

const Model = use('Model')

class Weekday extends Model {
    // Definir a tabela correspondente no banco de dados
    static get table() {
        return 'dias_semanais'
    }

    // Definir a chave primária, se for diferente de 'id'
    static get primaryKey() {
        return 'id'
    }

    // Indicar se os timestamps (created_at e updated_at) são usados
    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    // Relacionamento com o modelo Professional
    professional() {
        return this.belongsTo('App/Models/Professional', 'professional_id', 'id')
    }
}

module.exports = Weekday
