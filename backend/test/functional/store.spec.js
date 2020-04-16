'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Store')

trait('Test/ApiClient')
trait('Auth/Client')

test('create new store without jwt, should fail', async ({ client }) => {
  const data = await Factory.model('App/Models/Store').make()
  const store = data.toJSON()

  const response = await client.post('/stores').send(store).end()
  response.assertStatus(401)
}).timeout(0)

test('create new store with invalid registration number, should fail', async ({ client }) => {
  const data = await Factory.model('App/Models/Store').make()
  const store = data.toJSON()
  store.registration_number = '111111'
  const response = await client.post('/stores').send(store).end()

  response.assertStatus(400)
  response.assertError([
    {
      message: 'The registration_number should be a valid brazilian CNPJ.',
      field: 'registration_number',
      validation: 'cnpj'
    }
  ])
}).timeout(0)

test('create a new store with valid jwt token, should sucess', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()

  const data = await Factory.model('App/Models/Store').make()
  const store = data.toJSON()

  delete store.formated_registration

  const response = await client
    .post('/stores')
    .loginVia(user, 'jwt')
    .send(store)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    social_name: store.social_name
  })
}).timeout(0)
