'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const User = use('App/Models/User')

class UserController {
  async index ({ request }) {
    const { page } = request.get()
    const users = await User
      .query()
      .paginate(page)
    return users
  }

  /**
   * @param {Request} ctx.request
   */
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create(data)

    return response.created(user)
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }
}

module.exports = UserController
