'use strict'

const Route = use('Route')

// Rotas de Autenticação
Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
}).prefix('api/auth')

// Rotas de Agendamento
Route.group(() => {
  Route.post('/agendamentos', 'AgendamentoController.store').middleware(['auth']);
  Route.get('/agendamentos', 'AgendamentoController.index').middleware(['auth']);
  Route.get('/agendamentos/:id', 'AgendamentoController.show').middleware(['auth']);
  Route.put('/agendamentos/:id', 'AgendamentoController.update').middleware(['auth']);
  Route.get('/todos-agendamentos', 'AgendamentoController.todos')

}).prefix('api')

// Rota de Teste (Considere remover ou proteger em produção)
Route.get('test-db', 'TestDbConnectionController.index')


// Rotas profissionais
Route.group(() => {
  Route.post('/professionals', 'ProfessionalController.store').middleware(['auth']);
  Route.get('/professionals', 'ProfessionalController.index').middleware(['auth']);
  Route.get('/professionals/:id', 'ProfessionalController.show').middleware(['auth']);
  Route.put('/professionals/:id', 'ProfessionalController.update').middleware(['auth']);
  Route.delete('/professionals/:id', 'ProfessionalController.destroy').middleware(['auth']);
}).prefix('api')
