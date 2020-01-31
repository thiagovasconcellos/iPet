'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  orderStatus () {
    return this.belongsTo('App/Models/OrderStatus')
  }

  customer () {
    return this.belongsTo('App/Models/Customer')
  }

  store () {
    return this.belongsTo('App/Models/Store')
  }

  payments () {
    return this.hasMany('App/Models/OrderPayment')
  }

  items () {
    return this.hasMany('App/Models/OrderItem')
  }
}

module.exports = Order
