'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('REDIS_CONNECTION', 'local'),

  local: {
    host: Env.get('REDIS_HOST', '127.0.0.1'),
    port: Env.get('REDIS_PORT', 6379),
    password: Env.get('REDIS_PASSWORD', null), // Certifique-se de definir essa variável de ambiente para sua senha do Redis, se aplicável.
    db: Env.get('REDIS_DB', 0),
    keyPrefix: '',
  },

  // Exemplo de configuração adicional para um ambiente de produção ou um cluster Redis
  production: {
    host: Env.get('REDIS_HOST', '127.0.0.1'),
    port: Env.get('REDIS_PORT', 6379),
    password: Env.get('REDIS_PASSWORD', null),
    db: Env.get('REDIS_DB', 0),
    keyPrefix: '',
    tls: {}, // Se estiver usando TLS, pode ser necessário configurar opções específicas aqui
  },
  // Você pode adicionar mais conexões conforme necessário
}
