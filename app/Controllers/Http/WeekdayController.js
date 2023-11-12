'use strict'

const Weekday = use('App/Models/Weekday')

class WeekdayController {
    // Método para criar um novo dia da semana
    async store({ request, response }) {
        const { dia, ativo, professional_id } = request.only(['dia', 'ativo', 'professional_id'])

        try {
            const weekday = await Weekday.create({ dia, ativo, professional_id })
            return response.status(200).json(weekday)
        } catch (err) {
            console.error(err.message)
            return response.status(500).json({ error: 'Erro ao adicionar dia da semana.' })
        }
    }

    // Método para listar todos os dias da semana (ou de um profissional específico)
    async index({ request, response }) {
        const professionalId = request.input('professional_id')

        try {
            let weekdays
            if (professionalId) {
                weekdays = await Weekday.query().where('professional_id', professionalId).fetch()

                if (weekdays.rows.length === 0) {
                    const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
                    for (const day of days) {
                        await Weekday.create({ dia: day, ativo: false, professional_id: professionalId })
                    }
                    weekdays = await Weekday.query().where('professional_id', professionalId).fetch()
                }
            } else {
                weekdays = await Weekday.all()
            }

            return response.json(weekdays)
        } catch (err) {
            console.error(err.message)
            return response.status(500).json({ error: 'Erro ao buscar dias da semana.' })
        }
    }

    // Método para atualizar um dia da semana
    async update({ params, request, response }) {
        const { id } = params
        const { ativo, startam, endam, startpm, endpm } = request.only(['ativo', 'startam', 'endam', 'startpm', 'endpm'])

        try {
            const weekday = await Weekday.find(id)

            if (!weekday) {
                return response.status(404).json({ error: 'Dia da semana não encontrado.' })
            }

            weekday.merge({ ativo, startam, endam, startpm, endpm })
            await weekday.save()

            return response.json(weekday)
        } catch (err) {
            console.error('Erro na atualização:', err.message)
            return response.status(500).json({ error: 'Erro ao atualizar dia da semana.' })
        }
    }

    // Método para deletar um dia da semana
    async destroy({ params, response }) {
        const { id } = params

        try {
            const weekday = await Weekday.find(id)

            if (!weekday) {
                return response.status(404).json({ message: 'Dia da semana não encontrado.' })
            }

            await weekday.delete()
            return response.status(200).json({ message: 'Dia da semana excluído com sucesso.' })
        } catch (err) {
            console.error('Erro ao excluir:', err.message)
            return response.status(500).json({ error: 'Erro ao excluir dia da semana.' })
        }
    }
}

module.exports = WeekdayController
