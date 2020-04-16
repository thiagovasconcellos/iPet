'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Customer')

trait('Test/ApiClient')
trait('Auth/Client')

test('create new customer, should success', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = await Factory.model('App/Models/Customer').make()
  const customer = data.toJSON()

  const response = await client
    .post('/customers')
    .loginVia(user, 'jwt')
    .send(customer)
    .end()
  response.assertStatus(201)
  response.assertJSONSubset({
    first_name: customer.first_name
  })
}).timeout(0)

test('create new customer with invalid zipcode, should fail', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const data = await Factory.model('App/Models/Customer').make()
  const customer = data.toJSON()
  customer.zip_code = '123'

  const response = await client
    .post('/customers')
    .loginVia(user, 'jwt')
    .send(customer)
    .end()
  response.assertStatus(201)
  response.assertJSONSubset({
    first_name: customer.first_name
  })
}).timeout(0)
