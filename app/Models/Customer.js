'use strict'

const { cpf } = require('cpf-cnpj-validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static get computed () {
    return ['formated_registration']
  }

  // eslint-disable-next-line camelcase
  getFormatedRegistration ({ registration_number }) {
    return `${cpf.format(registration_number)}`
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  customerAddress () {
    return this.hasMany('App/Models/CustomerAddress')
  }
}

module.exports = Customer
