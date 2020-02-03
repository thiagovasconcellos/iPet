'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')

test('create new user and save it to database', async ({ client }) => {
  const user = await Factory.model('App/Models/User').make()
  const userJSON = user.toJSON()
  userJSON.password_confirmation = userJSON.password
  const response = await client.post('/users').send(userJSON).end()

  response.assertStatus(201)
}).timeout(2000)

test('create a new session with given username and password', async ({ client }) => {
  const data = await Factory.model('App/Models/User').create()
  const user = {
    email: data.toJSON().email,
    password: data.toJSON().password,
    password_confirmation: data.toJSON().password
  }

  const response = await client.post('/sessions').send(user).end()
  response.assertStatus(204)
}).timeout(2000)
