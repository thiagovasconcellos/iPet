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
Route.get('nearbyStores', 'StoreNearestController.index')

Route.group(() => {
  Route.resource('stores', 'StoreController').apiOnly()
  // Route.resource('customers', 'CustomerController').apiOnly()
}).middleware(['auth'])

Route.post('customers', 'CustomerController.store').validator('Customer')

Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('products.productPackages', 'ProductPackageController').apiOnly()
  Route.resource('productGroups', 'ProductGroupController').apiOnly()
}).middleware(['auth', 'store'])
