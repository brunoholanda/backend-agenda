'use strict'

const Model = use('Model')

class LogAtestado extends Model {
    // Especifica o nome da tabela que este Model representa
    static get table() {
        return 'logs_atestados'
    }

    // Defina outras propriedades e métodos conforme necessário
}

module.exports = LogAtestado
