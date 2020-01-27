'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BairroSchema extends Schema {
  up () {
    this.create('districts', table => {
      table.increments()
      table.string('code', 20)
      table.string('name')
      table.string('uf', 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('districts')
  }
}

module.exports = BairroSchema
