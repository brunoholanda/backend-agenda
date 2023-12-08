'use strict'

const Model = use('Model')

class StockItem extends Model {
    static get table() {
        return 'stock_items'
    }

    company() {
      return this.belongsTo('App/Models/Company')
    }

}

module.exports = StockItem
