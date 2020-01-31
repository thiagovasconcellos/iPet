'use strict'

const Antl = use('Antl')

class CustomerUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      first_name: 'max:50',
      last_name: 'max:50',
      registration_number: 'cpf|max:13',
      gender: 'max:2',
      'addresses.*.district_id': 'number',
      'addresses.*.state_id': 'number',
      'addresses.*.city_id': 'number',
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

module.exports = CustomerUpdate
