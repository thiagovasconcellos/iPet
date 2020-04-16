'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { cnpj } = require('cpf-cnpj-validator')

class Store extends Model {
  static get hidden () {
    return ['created_at', 'updated_at']
  }

  static get computed () {
    return ['formated_registration']
  }

  // eslint-disable-next-line camelcase
  getFormatedRegistration ({ registration_number }) {
    return `${cnpj.format(registration_number)}`
  }

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

  avatar () {
    return this.hasOne('App/Models/File')
  }

  productGroups () {
    return this.hasMany('App/Models/ProductGroup')
  }
}

module.exports = Store
