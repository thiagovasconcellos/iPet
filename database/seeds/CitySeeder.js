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
// eslint-disable-next-line no-unused-vars
const color = require('colors')

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
      console.log('seeded: '.green, 'CitySeeder.js')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = CitySeeder
