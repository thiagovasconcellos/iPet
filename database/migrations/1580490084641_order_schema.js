'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table
        .integer('order_status_id')
        .unsigned()
        .references('id')
        .inTable('order_statuses')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.decimal('total_value', [7], [2]).notNullable()
      table.decimal('discount', [7], [2])
      table.decimal('delivery_value', [7], [2])
      table.decimal('change_value', [7], [2])
      table.boolean('received').defaultTo(false)
      table.datetime('received_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
