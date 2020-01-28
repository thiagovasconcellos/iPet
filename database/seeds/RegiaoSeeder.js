'use strict'

/*
|--------------------------------------------------------------------------
| RegiaoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const regioes = require('../../database/initial_data/regioes.json')
const Region = use('App/Models/Region')
// eslint-disable-next-line no-unused-vars
const color = require('colors')

class RegiaoSeeder {
  async run () {
    try {
      const data = regioes.data

      for (const i in data) {
        await Region.create({ name: data[i].Nome })
      }
      console.log('seeded: '.green, 'RegiaoSeeder.js')
    } catch (err) {
      console.error(err)
    }
  }
}
module.exports = RegiaoSeeder
