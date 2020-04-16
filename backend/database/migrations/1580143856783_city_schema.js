'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MunicipioSchema extends Schema {
  up () {
    this.create('cities', table => {
      table.increments()
      table.integer('code')
      table.string('name', 150)
      table.string('uf', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('cities')
  }
}

module.exports = MunicipioSchema
