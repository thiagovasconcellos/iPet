'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerAddressSchema extends Schema {
  up () {
    this.create('customer_addresses', (table) => {
      table.increments()
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('district_id')
        .unsigned()
        .references('id')
        .inTable('districts')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('states')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('SET NULL')
        .onDelete('SET NULL')
      table.string('address_street', 50).notNullable()
      table.bigInteger('address_number')
      table.string('zip_code', 8)
      table.decimal('latitude', [10], [8])
      table.decimal('longitude', [11], [8])
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_addresses')
  }
}

module.exports = CustomerAddressSchema
