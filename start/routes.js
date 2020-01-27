'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')
Route.post('forgotpassword', 'ForgotPasswordController.store')
Route.put('forgotpassword', 'ForgotPasswordController.update')

Route.group(() => {
  Route.resource('stores', 'StoreController').apiOnly()
}).middleware(['auth'])
