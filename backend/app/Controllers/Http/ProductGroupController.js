'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ProductGroup = use('App/Models/ProductGroup')

/**
 * Resourceful controller for interacting with productgroups
 */
class ProductGroupController {
  /**
   * Show a list of all productgroups.
   * GET productgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } = request.get()
    // eslint-disable-next-line camelcase
    const store_id = request.stored_id
    const groups = await ProductGroup
      .query()
      .where({ store_id })
      .paginate(page)
    console.log(`resposta: ${groups}`)

    return groups
  }

  /**
   * Create/save a new productgroup.
   * POST productgroups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    // eslint-disable-next-line camelcase
    const store_id = request.stored_id
    const data = request.all()

    const group = await ProductGroup.create({ ...data, store_id })

    return group
  }

  /**
   * Update productgroup details.
   * PUT or PATCH productgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const group = await ProductGroup.findOrFail(params.id)
    const data = request.all()

    group.merge(data)

    await group.save()

    return group
  }

  /**
   * Delete a productgroup with id.
   * DELETE productgroups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const group = await ProductGroup.findOrFail(params.id)

    await group.delete()
  }
}

module.exports = ProductGroupController
