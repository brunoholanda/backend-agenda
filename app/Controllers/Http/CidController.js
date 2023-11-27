'use strict'

const Cid = use('App/Models/Cid')

class CidController {
    async index({ response }) {
        try {
            const cids = await Cid.all()
            return response.json(cids)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }

    async search({ request, response }) {
        try {
            const query = request.input('query')
            const results = await Cid.query()
                .where('description', 'LIKE', `%${query}%`)
                .orWhere('code', 'LIKE', `%${query}%`)
                .fetch()
            return response.json(results)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}

module.exports = CidController
