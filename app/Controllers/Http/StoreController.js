'use strict'

const Store = use('App/Models/Store')
const City = use('App/Models/City')
const District = use('App/Models/District')
const State = use('App/Models/State')
const { cnpj } = require('cpf-cnpj-validator')
const isValidCep = require('@brazilian-utils/is-valid-cep')
const Mail = use('Mail')

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
  async index ({ request }) {
    const { page } = request.get()
    const stores = await Store
      .query()
      .with('user')
      .with('city')
      .with('district')
      .with('state')
      .paginate(page)

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
    const store = data
    const user = auth.user
    store.user_id = user.id
    const city = await City.findOrFail(data.city_id)
    const district = await District.findOrFail(data.district_id)
    const state = await State.findOrFail(data.state_id)

    await Store.create({ store })

    await Mail.send(
      ['emails.welcome'],
      {
        user: user.username,
        social_name: store.social_name,
        fantasy_name: store.fantasy_name,
        registration_number: cnpj.format(store.registration_number),
        address_street: store.address_street,
        address_number: store.address_number,
        district: district.name,
        city: city.name,
        state: state.name,
        radius_of_care: store.radius_of_care,
        delivery_time: store.delivery_time
      },
      message => {
        message
          .to(user.email)
          .from('admin@ipet.com.br', 'Administrador do sistema')
          .subject('Bem vindo ao iPet!')
      }
    )

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
