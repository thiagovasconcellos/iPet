'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductGroupSchema extends Schema {
  up () {
    this.create('product_groups', (table) => {
      table.increments()
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_groups')
  }
}

module.exports = ProductGroupSchema
