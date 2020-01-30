'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Store = use('App/Models/Store')
const { getDistance } = require('geolib')

class StoreNearestController {
/**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    //    RETORNA OS ESTABELECIMENTOS PROXIMOS MAS PEGA TUDO DA BASE
    const { latitude, longitude } = request.get()

    const storesNearby = []
    const stores = await Store
      .query()
      .fetch()
    try {
      for (const i in stores.rows) {
        const store = stores.rows[i]
        const distance = getDistance(
          { latitude: latitude, longitude: longitude },
          { latitude: store.latitude, longitude: store.longitude }
        )
        if ((distance / 1000) < store.radius_of_care) {
          store.distance = (distance / 1000)
          storesNearby.push(store)
        }
      }
      return storesNearby
    } catch (error) {
      return response
        .status(error.status)
        .send(error.message)
    }
  }

  /**
   * Display a single store.
   * GET stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
  }
}

module.exports = StoreNearestController
