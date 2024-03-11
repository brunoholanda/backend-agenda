'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('REDIS_CONNECTION', 'local'),
  local: {
    host: Env.get('REDIS_HOST', '127.0.0.1'),
    port: Env.get('REDIS_PORT', 6379),
    password: Env.get('REDIS_PASSWORD', null),
    db: Env.get('REDIS_DB', 0),
    keyPrefix: ''
  },
}
