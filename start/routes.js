'use strict'

const Route = use('Route')
const Helpers = use('Helpers');

// Rotas de Autenticação
Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('generate-temp-token', 'AuthController.generateTempToken')
}).prefix('api/auth')

// start/routes.js
Route.group(() => {
  Route.post('/password-reset', 'PasswordResetController.requestReset');
  Route.post('/reset-password', 'PasswordResetController.resetPassword');
}).prefix('api/auth')

// Rotas de Agendamento
Route.group(() => {
  Route.post('/agendamentos', 'AgendamentoController.store')
  Route.get('/agendamentos', 'AgendamentoController.index').middleware(['auth']);
  Route.get('/agendamentos/:id', 'AgendamentoController.show').middleware(['auth']);
  Route.put('/agendamentos/:id', 'AgendamentoController.update').middleware(['auth']);
  Route.get('/todos-agendamentos', 'AgendamentoController.all').middleware(['auth']);
  Route.get('/todos-agendamentos/:id', 'AgendamentoController.all').middleware(['auth']);

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
  Route.post('/professionals/authenticate', 'ProfessionalController.authenticate');

}).prefix('api')


// Rotas das empresas
Route.group(() => {
  Route.post('/companies', 'CompanyController.store')
  Route.get('/companies', 'CompanyController.index').middleware(['auth']);
  Route.get('/companies/:company_id', 'CompanyController.show').middleware(['auth']);
  Route.put('/companies/:company_id', 'CompanyController.update').middleware(['auth']);
  Route.delete('/companies/:company_id', 'CompanyController.destroy').middleware(['auth']);
}).prefix('api')


// Rotas das datas indisponiveis
Route.group(() => {
  Route.post('/disabledDates', 'DisabledDateController.store').middleware(['auth']);
  Route.get('/disabledDates', 'DisabledDateController.index').middleware(['auth']);
  Route.delete('/disabledDates/:id', 'DisabledDateController.destroy').middleware(['auth']);
  Route.put('/disabledDates/:id', 'DisabledDateController.update').middleware(['auth']);
}).prefix('api')

// Rotas das datas disponiveis
Route.group(() => {
  Route.post('/dias-semanais', 'WeekdayController.store').middleware(['auth']);
  Route.get('/dias-semanais', 'WeekdayController.index').middleware(['auth']);
  Route.put('/dias-semanais/:id', 'WeekdayController.update').middleware(['auth']);
}).prefix('api')

Route.group(() => {
  Route.get('clients', 'ClientsController.index').middleware(['auth']);
  Route.post('clients', 'ClientsController.store')
  Route.get('clients/:id', 'ClientsController.show').middleware(['auth']);
  Route.put('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.patch('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.delete('clients/:id', 'ClientsController.destroy').middleware(['auth']);
  Route.post('clients/:id/notes', 'ClientsController.addNotes').middleware(['auth']);
  Route.get('clients/:id/notes', 'ClientsController.getNotes').middleware(['auth']);
}).prefix('api')

Route.group(() => {
  Route.post('/start-payment', 'PaymentController.startPayment');
  Route.post('/payment-notification', 'PaymentController.paymentNotification');
}).prefix('api')
Route.group(() => {

  Route.get('/uploads/logos/:filename', async ({ params, response }) => {
    return response.download(Helpers.publicPath(`uploads/logos/${params.filename}`));
  });
}).prefix('api')

Route.group(() => {
  Route.get('cid10', 'CidController.index').middleware(['auth']);
  Route.get('cid10/search', 'CidController.search').middleware(['auth']);

}).prefix('api')

'use strict'

Route.group(() => {
  Route.get('planos_medicos', 'PlanoMedicoController.index')
  Route.post('planos_medicos', 'PlanoMedicoController.store')
  Route.get('professionals/:id/planos', 'ProfessionalPlanoMedicoController.index')
  Route.post('professionals/:professional_id/planos', 'ProfessionalPlanoMedicoController.store')
  Route.delete('professionals/:professional_id/planos', 'ProfessionalPlanoMedicoController.destroy')
  Route.get('professionals/check-login/:login', 'ProfessionalController.checkLogin');
}).prefix('api')


Route.get('clients/cpf/:cpf', 'ClientsController.findByCpf').prefix('api')

