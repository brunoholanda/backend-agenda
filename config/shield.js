'use strict'

module.exports = {

  csp: {

    directives: {
    },

    reportOnly: false,

    setAllHeaders: false,


    disableAndroid: true
  },


  xss: {
    enabled: true,
    enableOnOldIE: false
  },


  xframe: 'DENY',


  nosniff: true,


  noopen: true,


  csrf: {
    enable: false,
    methods: ['POST', 'PUT', 'DELETE'],
    filterUris: [],
    cookieOptions: {
      httpOnly: false,
      sameSite: true,
      path: '/',
      maxAge: 7200
    }
  }
}
