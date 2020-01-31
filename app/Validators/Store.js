'use strict'

const Antl = use('Antl')

class Store {
  get rules () {
    return {
      district_id: 'required',
      state_id: 'required',
      city_id: 'required',
      social_name: 'required|max:50',
      fantasy_name: 'required|max:50',
      registration_number: 'required|cnpj',
      address_street: 'required|max:50',
      zip_code: 'required|cep',
      phone_number: 'max:15',
      latitude: 'number',
      longitude: 'number',
      delivery_time: 'number',
      radius_of_care: 'number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store
