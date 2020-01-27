'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegiaoSchema extends Schema {
  up () {
    this.create('regions', table => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('regions')
  }
}

module.exports = RegiaoSchema
