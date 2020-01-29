'use strict'

/*
|--------------------------------------------------------------------------
| PaymentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const payments = require('../initial_data/pagamentos.json')
const Payment = use('App/Models/Payment')
// eslint-disable-next-line no-unused-vars
const color = require('colors')

class PaymentSeeder {
  async run () {
    try {
      for (const i in payments) {
        await Payment.create({ name: payments[i].name })
      }
      console.log('seeded: '.green, 'PaymentSeeder.js')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = PaymentSeeder
