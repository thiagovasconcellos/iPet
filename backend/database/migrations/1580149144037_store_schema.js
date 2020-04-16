'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreSchema extends Schema {
  up () {
    this.create('stores', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
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
      table.string('social_name', 50).notNullable()
      table.string('fantasy_name', 50).notNullable()
      table.string('registration_number', 14)
      table.string('municipal_registration', 15)
      table.string('address_street', 50).notNullable()
      table.bigInteger('address_number')
      table.string('zip_code', 8)
      table.string('phone_number', 15)
      table.decimal('latitude', [10], [8])
      table.decimal('longitude', [11], [8])
      table.integer('delivery_time')
      table.integer('radius_of_care')
      table.timestamps()
    })
  }

  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
