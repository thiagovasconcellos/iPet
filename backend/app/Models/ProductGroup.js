'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductGroup extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  store () {
    return this.hasOne('App/Models/File')
  }

  product () {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = ProductGroup
