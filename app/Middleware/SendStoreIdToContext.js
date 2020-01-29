'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Store = use('App/Models/Store')

class SendStoreIdToContext {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth }, next) {
    const userid = auth.user.id
    const store = await Store.findBy('user_id', userid)
    request.stored_id = store.id
    await next()
  }
}

module.exports = SendStoreIdToContext
