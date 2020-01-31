'use strict'

/** @type {import('@adonisjs/framework/src/Route/Manager'} */

const Route = use('Route')

// Basic routes. No need authorization
Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('forgotpassword', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgotpassword', 'ForgotPasswordController.update').validator('ResetPassword')
Route.get('files/:id', 'FileController.show')
Route.post('files', 'FileController.store')
Route.post('stores', 'StoreController.store').validator('Store')
Route.get('nearbyStores', 'StoreNearestController.index')

// Routes to create stores and customers.
Route.group(() => {
  Route.resource('stores', 'StoreController').apiOnly()
  Route.resource('customers', 'CustomerController')
    .validator(new Map([
      [['customers.store'], ['CustomerStore']],
      [['customers.update'], ['CustomerUpdate']]
    ]))
    .apiOnly()
}).middleware(['auth'])

// Special group to products. Needs a middleware to validate if the product has a valid store associatated.
Route.group(() => {
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('products.productPackages', 'ProductPackageController').apiOnly()
  Route.resource('productGroups', 'ProductGroupController').apiOnly()
}).middleware(['auth', 'store'])
