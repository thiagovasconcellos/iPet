'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const { isAfter, addDays } = require('date-fns')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')

      const user = await User.findByOrFail('email', email)
      const date = new Date()

      user.token = crypto.randomBytes(15).toString('hex')
      user.token_created_at = date

      await user.save()

      await Mail.send(
        ['emails.forgotpassword', 'emails.forgotpassword_text'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('admin@ipet.com.br', 'Administrador do sistema')
            .subject('Recuperação de senha')
        }
      )
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'O e-mail é inválido' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.only(['token', 'password'])

      const user = await User.findByOrFail('token', token)

      const expirationTokenDate = addDays(user.token_created_at, 2)
      const today = new Date()

      if (isAfter(today, expirationTokenDate)) {
        return response
          .status(401)
          .send({ error: { message: 'Token expirado!' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
      return response.send({ ok: { message: 'Alteração concluída com sucesso' } })
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Falha ao gerar recuperação de senha. Verifique os dados e tente novamente.' } })
    }
  }
}

module.exports = ForgotPasswordController
