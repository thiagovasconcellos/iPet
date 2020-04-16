'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  productPackage () {
    return this.hasMany('App/Models/ProductPackage')
  }

  productGroup () {
    return this.hasMany('App/Models/ProductGroup')
  }
}

module.exports = Product
