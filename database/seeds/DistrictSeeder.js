'use strict'

/*
|--------------------------------------------------------------------------
| DistrictSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const bairros = require('../initial_data/bairros.json')
const District = use('App/Models/District')

class DistrictSeeder {
  async run () {
    const data = bairros.data

    try {
      for (const i in data) {
        await District.create({
          code: data[i].Codigo,
          name: data[i].Nome,
          uf: data[i].Uf
        })
      }
      console.log('seeded: DistrictSeeder.js')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = DistrictSeeder
