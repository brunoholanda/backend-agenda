'use strict'

const Cid = use('App/Models/Cid');
const Redis = use('Redis');

class CidController {
    async index({ response }) {
        const cacheKey = 'cids:index';
        try {
            // Tenta recuperar os cids do cache
            let cids = await Redis.get(cacheKey);

            if (cids) {
                cids = JSON.parse(cids);  // Deserializa os dados do cache
            } else {

              const result = await Cid.all();
                cids = result.toJSON();
                await Redis.set(cacheKey, JSON.stringify(cids));
              }

            return response.json(cids);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async search({ request, response }) {
        try {
            const query = request.input('query');
            const cacheKey = `cids:search:${query}`;

            let results = await Redis.get(cacheKey);

            if (results) {
                results = JSON.parse(results);
            } else {
                results = await Cid.query()
                    .where('description', 'LIKE', `%${query}%`)
                    .orWhere('code', 'LIKE', `%${query}%`)
                    .fetch();
                results = results.toJSON();
                await Redis.set(cacheKey, JSON.stringify(results));
              }

            return response.json(results);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

module.exports = CidController;
