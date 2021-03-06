'use strict'

/*
|--------------------------------------------------------------------------
| StateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const estados = require('../initial_data/estados.json')
const State = use('App/Models/State')
// eslint-disable-next-line no-unused-vars
const color = require('colors')

class StateSeeder {
  async run () {
    const data = estados.data

    try {
      for (const i in data) {
        await State.create({
          uf_code: data[i].CodigoUf,
          name: data[i].Nome,
          uf: data[i].Uf,
          region: data[i].Regiao
        })
      }
      console.log('seeded: '.green, 'StateSeeder.js')
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = StateSeeder
