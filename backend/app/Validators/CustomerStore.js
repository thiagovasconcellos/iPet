'use strict'

const Antl = use('Antl')

class CustomerStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      first_name: 'required|max:50',
      last_name: 'required|max:50',
      registration_number: 'required|cpf|unique:customers|max:13',
      gender: 'max:2',
      'addresses.*.district_id': 'required',
      'addresses.*.state_id': 'required',
      'addresses.*.city_id': 'required',
      'addresses.*.zip_code': 'cep|max:8',
      'addresses.*.address_street': 'max:50',
      'addresses.*.address_number': 'number',
      'addresses.*.address_latitude': 'number',
      'addresses.*.address_longititude': 'number'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = CustomerStore
