'use strict'

module.exports = {
  origin: '*', // Ou '*' para permitir todas as origens (não seguro para produção)
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  headers: true,
  exposeHeaders: false,
  credentials: true, // Se você precisa de cookies ou cabeçalhos de autenticação
  maxAge: 90
}
