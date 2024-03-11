'use strict'


const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/websocket/providers/WsProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/redis/providers/RedisProvider'
]


const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

const aliases = {}


const commands = []

module.exports = { providers, aceProviders, aliases, commands }
