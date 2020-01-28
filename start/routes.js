'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('forgotpassword', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgotpassword', 'ForgotPasswordController.update').validator('ResetPassword')
Route.get('files/:id', 'FileController.show')
Route.post('files', 'FileController.store')
Route.post('stores', 'StoreController.store').validator('Store')

Route.group(() => {
  Route.resource('stores', 'StoreController').apiOnly()
  Route.resource('customers', 'CustomerController').apiOnly()
}).middleware(['auth'])
