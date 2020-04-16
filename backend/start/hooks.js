'use strict'
const { hooks } = require('@adonisjs/ignitor')

hooks.before.providersBooted(() => {
  const Validator = use('Validator')
  const { cpf, cnpj } = require('cpf-cnpj-validator')
  const isValidCep = require('@brazilian-utils/is-valid-cep')
  const { isGTIN } = require('gtin')

  const validCpf = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!cpf.isValid(value)) {
      throw message
    }
  }

  const validCep = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!isValidCep(value)) {
      throw message
    }
  }

  const validCnpj = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!cnpj.isValid(value)) {
      throw message
    }
  }

  const validGtin = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!isGTIN(value)) {
      throw message
    }
  }

  Validator.extend('cpf', validCpf)
  Validator.extend('cep', validCep)
  Validator.extend('cnpj', validCnpj)
  Validator.extend('gtin', validGtin)
})
