'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const fake = require('faker')
const { cnpj } = require('cpf-cnpj-validator')

Factory.blueprint('App/Models/User', faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: '123456'
  }
})

Factory.blueprint('App/Models/Store', faker => {
  return {
    district_id: 8772,
    state_id: 25,
    city_id: 3837,
    social_name: 'iPet Comércio de Produtos PetShop LTDA',
    fantasy_name: 'iPet',
    registration_number: cnpj.generate(),
    municipal_registration: '123412311',
    address_street: 'Rua Messia Assú',
    address_number: 119,
    zip_code: '11320130',
    phone_number: '11994721485',
    latitude: -23.972440,
    longitude: -46.372780,
    delivery_time: 45,
    radius_of_care: 5
  }
})

Factory.blueprint('App/Models/Customer', () => {
  fake.locale = 'pt_BR'
  return {
    first_name: fake.name.firstName(),
    last_name: fake.name.lastName(),
    registration_number: '36336367819',
    gender: 'M',
    addresses: [
      {
        district_id: 8772,
        state_id: 25,
        city_id: 3837,
        address_street: `${fake.address.streetPrefix()}${fake.address.streetAddress()}`,
        address_number: fake.random.number(),
        zip_code: fake.address.zipCode('11130320'),
        latitude: fake.address.latitude(),
        longitude: fake.address.longitude()
      }
    ]
  }
})
