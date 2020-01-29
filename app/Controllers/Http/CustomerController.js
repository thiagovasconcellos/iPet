'use strict'

const Customer = use('App/Models/Customer')
const { cpf } = require('cpf-cnpj-validator')
const isValidCep = require('@brazilian-utils/is-valid-cep')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { page } = request.get()
    const customers = await Customer
      .query()
      .with('customerAddress')
      .paginate(page)

    return customers
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['first_name', 'last_name', 'registration_number', 'gender'])

    if (!cpf.isValid(data.registration_number)) {
      return response
        .status(401)
        .send({ error: { message: 'Cpf inválido! Verifique as informações e tente novamente' } })
    }

    const addresses = request.input('addresses')

    addresses.map(add => {
      if (!isValidCep(add.zip_code)) {
        return response
          .status(401)
          .send({ error: { message: `O cep ${add.zip_code} é inválido! Verifique e tente novamente` } })
      }
    })

    data.user_id = auth.user.id

    const transaction = await Database.beginTransaction()

    const customer = await Customer.create(data, transaction)

    await customer.customerAddress().createMany(addresses, transaction)

    await transaction.commit()

    return customer
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const customer = await Customer.findOrFail(params.id)

    await customer.load('customerAddress')

    return customer
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const customer = await Customer.findOrFail(params.id)
    const data = request.all()

    customer.merge(data)

    await customer.save()

    return customer
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const customer = await Customer.findOrFail(params.id)

    await customer.delete()
  }
}

module.exports = CustomerController
