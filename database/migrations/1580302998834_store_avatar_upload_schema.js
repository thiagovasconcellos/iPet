'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreAvatarUploadSchema extends Schema {
  up () {
    this.table('stores', table => {
      table
        .integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('stores', table => {
      // reverse alternations
    })
  }
}

module.exports = StoreAvatarUploadSchema
