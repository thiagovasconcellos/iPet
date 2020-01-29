'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  productPackage () {
    return this.hasMany('App/Models/ProductPackage')
  }

  productGroup () {
    return this.hasMany('App/Models/ProductGroup')
  }
}

module.exports = Product
