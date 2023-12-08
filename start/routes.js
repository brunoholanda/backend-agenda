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
  Route.get('clients/search', 'ClientsController.search').middleware(['auth']); // Esta linha deve vir primeiro
  Route.get('clients', 'ClientsController.index').middleware(['auth']);
  Route.post('clients', 'ClientsController.store')
  Route.get('clients/:id', 'ClientsController.show').middleware(['auth']);
  Route.put('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.patch('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.delete('clients/:id', 'ClientsController.destroy').middleware(['auth']);
  Route.post('clients/:id/notes', 'ClientsController.addNotes').middleware(['auth']);
  Route.get('clients/:id/notes', 'ClientsController.getNotes').middleware(['auth']);
}).prefix('api');


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

Route.group(() => {
Route.get('professional-intervals', 'ProfessionalIntervalController.index')
Route.post('professional-intervals', 'ProfessionalIntervalController.store')
Route.get('professional-intervals/:id', 'ProfessionalIntervalController.show')
Route.put('professional-intervals/:id', 'ProfessionalIntervalController.update')
Route.delete('professional-intervals/:id', 'ProfessionalIntervalController.destroy')
Route.get('professional-intervals/professional/:professional_id', 'ProfessionalIntervalController.findByProfessionalId');
}).prefix('api')

Route.group(() => {
  Route.get('stock-items', 'StockItemController.index')
  Route.post('stock-items', 'StockItemController.store')
  Route.get('stock-items/:id', 'StockItemController.show')
  Route.put('stock-items/:id', 'StockItemController.update')
  Route.patch('stock-items/:id', 'StockItemController.update')
  Route.delete('stock-items/:id', 'StockItemController.delete')
}).prefix('api')

Route.group(() => {
  Route.get('/contabilidades/saldo', 'ContabilidadeController.saldo').middleware(['auth']);
  Route.get('/contabilidades/transacoes/mes', 'ContabilidadeController.transacoesDoMes').middleware(['auth']);
  Route.get('/contabilidades/lucro-mensal-detalhado', 'ContabilidadeController.lucroMensalDetalhado').middleware(['auth']);
  Route.get('/contabilidades/transacoes', 'ContabilidadeController.buscarTransacoes').middleware(['auth']);
  Route.get('/contabilidades/transacoes/extrato', 'ContabilidadeController.getTransactionsByMonthAndYear').middleware(['auth'])

  Route.post('/contabilidades', 'ContabilidadeController.store').middleware(['auth']);
  Route.get('/contabilidades', 'ContabilidadeController.index').middleware(['auth']);
  Route.get('/contabilidades/:id', 'ContabilidadeController.show').middleware(['auth']);
  Route.put('/contabilidades/:id', 'ContabilidadeController.update').middleware(['auth']);
  Route.delete('/contabilidades/:id', 'ContabilidadeController.destroy').middleware(['auth']);

}).prefix('api')

Route.get('clients/cpf/:cpf', 'ClientsController.findByCpf').prefix('api')

