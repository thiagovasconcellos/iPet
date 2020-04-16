'use strict'

/*
|--------------------------------------------------------------------------
| OrderStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const statuses = require('../initial_data/status_pedido.json')
const Status = use('App/Models/OrderStatus')
// eslint-disable-next-line no-unused-vars
const color = require('colors')

class OrderStatusSeeder {
  async run () {
    try {
      for (const i in statuses) {
        await Status.create({ name: statuses[i].name })
      }
      console.log('seeded: '.green, 'OrderStatusSeeder.js')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = OrderStatusSeeder
