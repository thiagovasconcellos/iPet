'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductPackageSchema extends Schema {
  up () {
    this.create('product_packages', (table) => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('package', 3).notNullable()
      table.string('ean', 13)
      table.float('amount')
      table.decimal('price', [7], [2])
      table.boolean('active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('product_packages')
  }
}

module.exports = ProductPackageSchema
