'use strict'

class Product {
  get rules () {
    return {
      legacy_code: 'max:15',
      name: 'required|max:100',
      ean: 'gtin|max:13',
      price: 'number',
      'productPackage.*.ean': 'gtin|max:13',
      'productPackage.*.amount': 'number',
      'productPackage.*.price': 'number'
    }
  }
}

module.exports = Product
