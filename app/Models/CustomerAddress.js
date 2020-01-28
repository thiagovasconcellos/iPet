'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CustomerAddress extends Model {
  customer () {
    return this.belongsTo('App/Models/Customer')
  }

  city () {
    return this.belongsTo('App/Models/City')
  }

  district () {
    return this.belongsTo('App/Models/District')
  }

  state () {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = CustomerAddress
