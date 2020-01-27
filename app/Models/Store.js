'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  user () {
    return this.belongsTo('App/Models/User')
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

module.exports = Store
