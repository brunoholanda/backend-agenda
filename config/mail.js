'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('MAIL_CONNECTION', 'smtp'),

  smtp: {
    driver: 'smtp',
    pool: true,
    port: Env.get('MAIL_PORT', 587), // Use 587 para STARTTLS ou 465 para SSL/TLS
    host: Env.get('SMTP_HOST', 'smtp.titan.email'),
    secure: Env.get('MAIL_SECURE', false), // true para porta 465, false para porta 587
    auth: {
      user: Env.get('MAIL_USERNAME', 'contato@marquei.com.br'),
      pass: Env.get('MAIL_PASSWORD')
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  },

  // As demais configurações permanecem inalteradas
  sparkpost: {
    driver: 'sparkpost',
    apiKey: Env.get('SPARKPOST_API_KEY'),
    extras: {}
  },

  mailgun: {
    driver: 'mailgun',
    domain: Env.get('MAILGUN_DOMAIN'),
    apiKey: Env.get('MAILGUN_API_KEY'),
    region: Env.get('MAILGUN_API_REGION'),
    extras: {}
  },

  ethereal: {
    driver: 'ethereal'
  }
}
