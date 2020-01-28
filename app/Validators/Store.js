'use strict'

class Store {
  get rules () {
    return {
      district_id: 'required',
      state_id: 'required',
      city_id: 'required',
      social_name: 'required',
      fantasy_name: 'required',
      registration_number: 'required',
      address_street: 'required'
    }
  }
}

module.exports = Store
