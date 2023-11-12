'use strict'

const Database = use('Database')
const DisabledDate = use('App/Models/DisabledDate')
class DisabledDateController {
    async store({ request, response }) {
        const { date, allday, starttime, endtime, professional_id } = request.post()

        try {
            const disabledDate = await DisabledDate.create({ date, allday, starttime, endtime, professional_id })
            return response.status(201).json(disabledDate)
        } catch (err) {
            if (err.code === '23505') {
                return response.status(409).json({ error: 'Esta data já está desabilitada para o profissional selecionado.' })
            }
            console.error(err.message)
            return response.status(500).json({ error: 'Erro ao inserir data desabilitada.' })
        }
    }

    async index({ request, response }) {
        const professional_id = request.input('professional_id')
        try {
            const query = DisabledDate.query()

            if (professional_id) {
                query.where('professional_id', professional_id)
            }

            const disabledDates = await query.fetch()
            return response.json(disabledDates)
        } catch (err) {
            console.error(err.message)
            return response.status(500).json({ error: 'Erro ao buscar as datas desabilitadas.' })
        }
    }

    async destroy({ params, response }) {
        const id = params.id

        try {
            const disabledDate = await DisabledDate.find(id)

            if (!disabledDate) {
                return response.status(404).json({ message: 'Data desabilitada não encontrada' })
            }

            await disabledDate.delete()
            return response.json({ message: 'Data desabilitada excluída com sucesso' })
        } catch (err) {
            console.error(err.message)
            return response.status(500).json({ error: 'Erro ao excluir a data desabilitada.' })
        }
    }

    async update({ params, request, response }) {
        const id = params.id
        const { date, allday, starttime, endtime } = request.post()

        try {
            const disabledDate = await DisabledDate.find(id)

            if (!disabledDate) {
                return response.status(404).json({ message: 'Data desabilitada não encontrada' })
            }

            disabledDate.merge({ date, allday, starttime, endtime })
            await disabledDate.save()

            return response.json({ message: 'Data desabilitada atualizada com sucesso', data: disabledDate })
        } catch (err) {
            console.error(err.message)
            return response.status(500).json({ message: 'Erro ao atualizar a data desabilitada' })
        }
    }
}

module.exports = DisabledDateController
