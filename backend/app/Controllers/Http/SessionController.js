'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

const User = use('App/Models/User')

class SessionController {
  /**
   * @param {Request} ctx.request
   * @param {AuthSession} ctx.auth
   */
  async store({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await User.findBy('email', email)

    console.log(JSON.stringify(user))

    const logged = {
      token: token.token,
      user
    }

    return response.json(logged)
  }
}

module.exports = SessionController
