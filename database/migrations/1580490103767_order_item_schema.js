'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onUpdate('SET NULL')
        .onDelete('CASCADE')
      table
        .integer('package_id')
        .unsigned()
        .references('id')
        .inTable('product_packages')
        .onUpdate('SET NULL')
        .onDelete('CASCADE')
      table.float('amount').notNullable()
      table.decimal('unitary_value', [7], [2]).notNullable()
      table.decimal('total_value', [7], [2]).notNullable()
      table.decimal('unitary_discount', [7], [2]).notNullable()
      table.decimal('total_discount', [7], [2]).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
