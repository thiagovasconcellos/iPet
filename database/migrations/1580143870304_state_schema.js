'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadoSchema extends Schema {
  up () {
    this.create('states', table => {
      table.increments()
      table.integer('uf_code')
      table.string('name', 50)
      table.string('uf', 2)
      table.integer('region')
      table.timestamps()
    })
  }

  down () {
    this.drop('states')
  }
}

module.exports = EstadoSchema
