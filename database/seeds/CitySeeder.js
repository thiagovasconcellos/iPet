'use strict'

/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const municipios = require('../../database/initial_data/municipios.json')
const City = use('App/Models/City')
class CitySeeder {
  async run () {
    const data = municipios.data

    try {
      for (const i in data) {
        await City.create({
          code: data[i].Codigo,
          name: data[i].Nome,
          uf: data[i].Uf
        })
      }
      console.log('seeded: CitySeeder.js')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = CitySeeder
