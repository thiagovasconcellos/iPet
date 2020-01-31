'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderPaymentSchema extends Schema {
  up () {
    this.create('order_payments', (table) => {
      table.increments()
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('order')
        .onUpdate('SET NULL')
        .onDelete('CASCADE')
      table
        .integer('payment_id')
        .unsigned()
        .references('id')
        .inTable('payments')
        .onUpdate('SET NULL')
        .onDelete('CASCADE')
      table.decimal('value', [7], [2]).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_payments')
  }
}

module.exports = OrderPaymentSchema
