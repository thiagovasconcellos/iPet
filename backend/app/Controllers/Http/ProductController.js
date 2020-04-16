'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')
const ProductGroup = use('App/Models/ProductGroup')
const Database = use('Database')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    try {
      const { page } = request.get()
      const products = await Product
        .query()
        .where({ store_id: request.stored_id })
        .with('productPackage')
        .paginate(page)

      return products
    } catch (error) {
      console.log(error)
      return response.status(error.status).send(error.message)
    }
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['group_id', 'name', 'active', 'price'])

    const packageExistOnStore = await ProductGroup
      .query()
      .where({
        store_id: request.stored_id,
        id: data.group_id
      })
      .fetch()

    console.log(packageExistOnStore)

    if (!packageExistOnStore.lenght > 0) {
      return response
        .status(400)
        .send({ error: { message: 'The given group id could not be found on this store.' } })
    }

    data.store_id = request.stored_id

    const packages = request.input('packages')

    const transaction = await Database.beginTransaction()

    const product = await Product.create(data, transaction)

    await product.productPackage().createMany(packages, transaction)

    await transaction.commit()

    return response.created(product)
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    try {
      const product = await Product
        .query()
        .where({
          id: params.id,
          store_id: request.stored_id
        })
        .with('productPackage')
        .fetch()

      if (product.id === 0) {
        return response
          .status(400)
          .send({ error: { message: 'No products where found with the given id' } })
      }

      return product
    } catch (error) {
      return response
        .status(error.status)
        .send(error.message)
    }
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const product = await Product
        .query()
        .where({
          store_id: request.stored_id,
          id: params.id
        })
        .fetch()

      if (!product.lenght > 0) {
        return response
          .status(400)
          .send({ error: { message: 'No products where found with the given id' } })
      }

      await product.merge(data)

      return product
    } catch (error) {
      return response
        .status(error.status)
        .send(error.message)
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const product = await Product
      .query()
      .where({
        store_id: request.stored_id,
        id: params.id
      })
      .fetch()

    if (!product.lenght > 0) {
      return response
        .status(400)
        .send({ error: { message: 'No products where found with the given id' } })
    }

    await product.destroy()
    return response
      .status(201)
      .send({ ok: { message: 'Deleted' } })
  }
}

module.exports = ProductController
