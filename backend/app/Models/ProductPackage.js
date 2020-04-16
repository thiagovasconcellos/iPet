'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductPackage extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }

  orderItem () {
    return this.hasMany('App/Models/OrderItem')
  }
}

module.exports = ProductPackage
