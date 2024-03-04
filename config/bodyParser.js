'use strict'

module.exports = {

  json: {

    limit: '1mb',

    strict: true,


    types: [
      'application/json',
      'application/json-patch+json',
      'application/vnd.api+json',
      'application/csp-report'
    ]
  },


  raw: {
    types: [
      'text/*'
    ]
  },


  form: {
    types: [
      'application/x-www-form-urlencoded'
    ]
  },


  files: {
    types: ['multipart/form-data'],

    maxSize: '500kb',

    autoProcess: true,

    processManually: [],

    filter: function (file) {
      return ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
    }
  }
}
