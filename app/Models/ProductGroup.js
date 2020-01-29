'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductGroup extends Model {
  store () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = ProductGroup
