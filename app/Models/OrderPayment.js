'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderPayment extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

  payment () {
    return this.belongsTo('App/Models/Payment')
  }
}

module.exports = OrderPayment
