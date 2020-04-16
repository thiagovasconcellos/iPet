'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Order = use('App/Models/Order')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // eslint-disable-next-line camelcase
    const { customer_id } = request.get()
    const orders = Order.query()
      .where({ customer_id: customer_id })
      .with('orderStatus')
      .with('customer')
      .with('store')
      .with('payments.payment')
      .with('items.productPackage.product', 'id')
      // .with('packages')
      .fetch()

    return orders
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.only([
        'order_status_id',
        'store_id',
        'customer_id',
        'total_value',
        'discount',
        'delivery_value',
        'change_value',
        'received',
        'received_date'
      ])

      const payments = request.input('payments')
      const items = request.input('items')
      const transaction = await Database.beginTransaction()
      const order = await Order.create(data, transaction)
      await order.payments().createMany(payments, transaction)
      await order.items().createMany(items, transaction)
      await transaction.commit()
      return order
    } catch (error) {
      response.status(error.status).send(error.message)
    }
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
