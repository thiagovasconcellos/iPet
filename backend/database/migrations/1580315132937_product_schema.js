'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('group_id')
        .unsigned()
        .references('id')
        .inTable('product_groups')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('legacy_code', 15)
      table.string('name', 100).notNullable()
      table.string('ean', 13)
      table.boolean('active').defaultTo(true)
      table.decimal('price', [7], [2])
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
