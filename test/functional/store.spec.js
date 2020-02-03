'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Store')
const { cnpj } = require('cpf-cnpj-validator')

trait('Test/ApiClient')
trait('Auth/Client')

// test('create new store with valid informations, should sucess', async ({ client }) => {
//   const store = {
//     district_id: 8772,
//     state_id: 25,
//     city_id: 3837,
//     social_name: 'iPet Comércio de Produtos PetShop LTDA',
//     fantasy_name: 'iPet',
//     registration_number: '63879323000117',
//     municipal_registration: '123412311',
//     address_street: 'Rua Messia Assú',
//     address_number: 119,
//     zip_code: '11320130',
//     phone_number: '11994721485',
//     latitude: -23.972440,
//     longitude: -46.372780,
//     delivery_time: 45,
//     radius_of_care: 5
//   }

//   const response = await client.post('/stores').send(store).end()
//   response.assertStatus(204)
// })

// test('create new store with invalid informations, should fail', async ({ client }) => {
//   const store = {
//     district_id: 8772,
//     state_id: 25,
//     city_id: 3837,
//     social_name: 'iPet Comércio de Produtos PetShop LTDA',
//     fantasy_name: 'iPet',
//     registration_number: '65981367000',
//     municipal_registration: '123412311',
//     address_street: 'Rua Messia Assú',
//     address_number: 119,
//     zip_code: '11320130',
//     phone_number: '11994721485',
//     latitude: -23.972440,
//     longitude: -46.372780,
//     delivery_time: 45,
//     radius_of_care: 5
//   }

//   const response = await client.post('/stores').send(store).end()
//   response.assertStatus(400)
// }).timeout(6000)

test('create a valid store and return it via http request', async ({ assert, client }) => {
  const store = await Factory.model('App/Models/Store').create()
  const storeJSON = store.toJSON()

  const response = await client.get(`/stores/${storeJSON.id}`)
  console.log(response)

  response.assertStatus(204)
  response.assertJSONSubset(store)
}).timeout(6000)
