'use strict'

const Store = use('App/Models/Store')
const { cnpj } = require('cpf-cnpj-validator')
const isValidCep = require('@brazilian-utils/is-valid-cep')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  /**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const stores = await Store.query().with('user').with('city').with('district').with('state').fetch()

    return stores
  }

  /**
   * Render a form to be used for creating a new store.
   * GET stores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store ({ request, response, auth }) {
    const data = request.all()

    if (!cnpj.isValid(data.registration_number)) {
      return response
        .status(401)
        .send({ error: { message: 'Cnpj inválido! Verifique as informações e tente novamente' } })
    }

    if (!isValidCep(data.zip_code)) {
      return response
        .status(401)
        .send({ error: { message: 'CEP inválido! Verifique as informações e tente novamente' } })
    }

    const store = await Store.create({ ...data, user_id: auth.user.id })

    return store
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
    const store = await Store.findOrFail(params.id)

    await store.load('user')
    await store.load('city')
    await store.load('district')
    await store.load('state')

    store.registration_number = cnpj.format(store.registration_number)

    return store
  }

  /**
   * Render a form to update an existing store.
   * GET stores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update ({ params, request }) {
    const store = await Store.findOrFail(params.id)
    const data = request.all()

    store.merge(data)

    await store.save()

    return store
  }

  /**
   * Delete a store with id.
   * DELETE stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const store = await Store.findOrFail(params.id)

    await store.delete()
  }
}

module.exports = StoreController
