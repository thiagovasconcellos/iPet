'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderItem extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

  productPackage () {
    return this.belongsTo('App/Models/ProductPackage', 'id')
  }
}

module.exports = OrderItem
