'use strict'

const StockItem = use('App/Models/StockItem')

class StockItemController {
  async index({ request, response }) {
    const companyID = request.input('company_id');
    const items = await StockItem.query()
                                  .where('company_id', companyID)
                                  .fetch();
    return response.json(items);
  }

  async store({ request, response }) {
    const itemData = request.only(['nome', 'quantidade', 'limite_estoque', 'company_id']);
    const item = await StockItem.create(itemData);
    return response.status(201).json(item);
  }

    async show({ params, response }) {
        const item = await StockItem.find(params.id)
        return response.json(item)
    }

    async update({ params, request, response }) {
        const itemData = request.only(['nome', 'quantidade', 'limite_estoque'])
        const item = await StockItem.find(params.id)

        if (item) {
            item.merge(itemData)
            await item.save()
            return response.json(item)
        }

        return response.status(404).json({ message: 'Item not found' })
    }

    async delete({ params, response }) {
        const item = await StockItem.find(params.id)

        if (item) {
            await item.delete()
            return response.status(200).json({ message: 'Item deleted' })
        }

        return response.status(404).json({ message: 'Item not found' })
    }
}

module.exports = StockItemController
