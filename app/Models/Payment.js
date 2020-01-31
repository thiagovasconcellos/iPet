'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Payment extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  orderPayment () {
    return this.hasMany('App/Models/OrderPayment')
  }
}

module.exports = Payment
