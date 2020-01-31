'use strict'

const { test, trait } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

test('create new user and login into application', async ({ client }) => {
  await User.create({
    username: 'Thiago',
    email: 'test@ipet.com.br',
    password: '123456'
  })

  const response = await client.get('/users').end()

  response.assertStatus(204)
  response.assertJSONSubset([{
    username: 'Thiago',
    email: 'test@ipet.com.br',
    password: '123456'
  }])
})
