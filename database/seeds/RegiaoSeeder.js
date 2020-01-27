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

class RegiaoSeeder {
  async run () {
    try {
      const data = regioes.data

      for (const i in data) {
        await Region.create({ name: data[i].Nome })
      }
      console.log('seeded: RegiaoSeeder.js')
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = RegiaoSeeder
