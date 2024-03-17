'use strict'

const Route = use('Route')
const Helpers = use('Helpers');

// Rotas de Autenticação
Route.group(() => {
  Route.post('register', 'AuthController.register')
  Route.post('login', 'AuthController.login')
  Route.post('generate-temp-token', 'AuthController.generateTempToken')
  Route.post('check-email', 'AuthController.checkEmail')
  Route.get('company-log-details', 'AuthController.getCompanyInfo').middleware(['auth']);
}).prefix('api/auth')

Route.group(() => {
  Route.post('/send-welcome-email', 'WelcomeEmailController.sendWelcomeEmail');
  Route.post('/send-email', 'WelcomeEmailController.sendContactEmail');
  Route.get('nps-systems', 'NpsSystemController.index')
  Route.post('nps-systems', 'NpsSystemController.store')
}).prefix('api')


// start/routes.js
Route.group(() => {
  Route.post('/password-reset', 'PasswordResetController.requestReset');
  Route.post('/reset-password', 'PasswordResetController.resetPassword');
  Route.post('/password-reset-doctor', 'PasswordResetController.requestResetForDoctor');
  Route.post('/reset-password-doctor', 'PasswordResetController.resetPasswordForDoctor');
}).prefix('api/auth')

// Rotas de Agendamento
Route.group(() => {
  Route.post('/agendamentos', 'AgendamentoController.store')
  Route.get('/agendamentos', 'AgendamentoController.index').middleware(['auth']);
  Route.get('/agendamentos/occupied-hours', 'AgendamentoController.occupiedHours')
  Route.get('/agendamentos/:id', 'AgendamentoController.show').middleware(['auth']);
  Route.put('/agendamentos/:id', 'AgendamentoController.update').middleware(['auth']);
  Route.get('/todos-agendamentos', 'AgendamentoController.all').middleware(['auth']);
  Route.get('/todos-agendamentos/:id', 'AgendamentoController.all').middleware(['auth']);
  Route.get('chamados/:companyId', 'ChamadoController.index');
  Route.delete('agendamentos/:id', 'AgendamentoController.destroy').middleware(['auth']);
  Route.get('/confirma-agendamento/:id', 'AgendamentoController.showAgendamentoById');
  Route.put('/confirma-agendamento/:id', 'AgendamentoController.updateAgendamentoById');

}).prefix('api')

Route.group(() => {
  Route.post('recommendations', 'RecommendationController.store')
  Route.post('/recommendations', 'RecommendationController.store')
  Route.get('/recommendations/:companyId', 'RecommendationController.index')
  Route.put('/recommendations/:id', 'RecommendationController.update')
  Route.delete('/recommendations/:id', 'RecommendationController.destroy')
}).prefix('api')


Route.get('test-db', 'TestDbConnectionController.index')


// Rotas profissionais
Route.group(() => {
  Route.post('/professionals', 'ProfessionalController.store').middleware(['auth']);
  Route.get('/professionals', 'ProfessionalController.index').middleware(['auth']);
  Route.get('/public-professionals', 'ProfessionalController.professionalByPublic')
  Route.get('/professionals/:id', 'ProfessionalController.show').middleware(['auth']);
  Route.put('/professionals/:id', 'ProfessionalController.update').middleware(['auth']);
  Route.delete('/professionals/:id', 'ProfessionalController.destroy').middleware(['auth']);
  Route.post('/professionals/authenticate', 'ProfessionalController.authenticate');
  Route.get('/publicProfessionals/search', 'PublicProfessionalController.search');

}).prefix('api')


// Rotas das empresas
Route.group(() => {
  Route.post('/companies', 'CompanyController.store')
  Route.get('/companies', 'CompanyController.index').middleware(['auth']);
  Route.get('/companies/:company_id', 'CompanyController.show').middleware(['auth']);
  Route.put('/companies/:company_id', 'CompanyController.update').middleware(['auth']);
  Route.delete('/companies/:company_id', 'CompanyController.destroy').middleware(['auth']);
  Route.post('/companies/updatePaymentInfo', 'CompanyController.updatePaymentInfo').middleware(['auth']);
  Route.put('/companies/:company_id/updateTokenExpiration', 'CompanyController.updateTokenExpiration');
  Route.get('/companies-by-id/:company_id', 'CompanyController.findCompanyNameById');
}).prefix('api')


// Rotas das datas indisponiveis
Route.group(() => {
  Route.post('/disabledDates', 'DisabledDateController.store').middleware(['auth']);
  Route.get('/disabledDates', 'DisabledDateController.index')
  Route.delete('/disabledDates/:id', 'DisabledDateController.destroy').middleware(['auth']);
  Route.put('/disabledDates/:id', 'DisabledDateController.update').middleware(['auth']);
}).prefix('api')

// Rotas para PublicProfessionalController
Route.group(() => {
  Route.get('/publicProfessionals', 'PublicProfessionalController.index');
  Route.post('/publicProfessionals', 'PublicProfessionalController.store').middleware(['auth']);
  Route.get('publicProfessionals/professional/:professional_id', 'PublicProfessionalController.showByProfessionalId').middleware(['auth']);
  Route.get('/publicProfessionals/:id', 'PublicProfessionalController.show');
  Route.put('/publicProfessionals/:id', 'PublicProfessionalController.update').middleware(['auth']);
  Route.delete('/publicProfessionals/:id', 'PublicProfessionalController.destroy').middleware(['auth']);
}).prefix('api')

// Rotas das datas disponiveis
Route.group(() => {
  Route.post('/dias-semanais', 'WeekdayController.store').middleware(['auth']);
  Route.get('/dias-semanais', 'WeekdayController.index')
  Route.put('/dias-semanais/:id', 'WeekdayController.update').middleware(['auth']);
}).prefix('api')

Route.group(() => {
  Route.get('clients/search', 'ClientsController.search').middleware(['auth']); // Esta linha deve vir primeiro
  Route.get('clients', 'ClientsController.index')
  Route.post('clients', 'ClientsController.store')
  Route.get('clients/:id', 'ClientsController.show').middleware(['auth']);
  Route.put('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.patch('clients/:id', 'ClientsController.update').middleware(['auth']);
  Route.delete('clients/:id', 'ClientsController.destroy').middleware(['auth']);
  Route.post('/clients/:clientId/notes', 'ProntuarioController.store').middleware(['auth']);
  Route.get('/clients/:clientId/notes', 'ProntuarioController.index').middleware(['auth']);
  Route.post('/prontuarios', 'ProntuarioController.store').middleware(['auth']);
}).prefix('api');

Route.group(() => {
  Route.get('clients/cpf/:cpf', 'ClientsController.findByCpf')
  Route.get('clients/email/:client_email', 'ClientsController.findByEmail') // Use 'client_email' na rota, pois é o que seu controller espera
}).prefix('api');


Route.group(() => {
  Route.post('/start-payment', 'PaymentController.startPayment');
  Route.post('/payment-notification', 'PaymentController.paymentNotification');
}).prefix('api')
Route.group(() => {

  Route.get('/uploads/logos/:filename', async ({ params, response }) => {
    return response.download(Helpers.publicPath(`uploads/logos/${params.filename}`));
  });

  Route.get('/uploads/chamados/:filename', async ({ params, response }) => {
    return response.download(Helpers.publicPath(`uploads/chamados/${params.filename}`));
  });

  Route.get('/uploads/ProfileDoctor/:filename', async ({ params, response }) => {
    return response.download(Helpers.publicPath(`uploads/ProfileDoctor/${params.filename}`));
  });

  Route.get('/uploads/clientes/:filename', async ({ params, response }) => {
    return response.download(Helpers.publicPath(`uploads/clientes/${params.filename}`));
  });

  Route.delete('/chamados/:id/deleteImage', 'ChamadoController.deleteImage');

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


Route.group(() => {
  Route.post('user-specialty/associate', 'UserSpecialtyController.associate')
  Route.get('company-specialties', 'UserSpecialtyController.index')
}).prefix('api')

Route.group(() => {

  Route.post('logs_atestados', 'LogAtestadoController.store')
  Route.get('logs_atestados/:id', 'LogAtestadoController.show');
  Route.get('services', 'ServiceController.index')
  Route.get('service_details/:id', 'ServiceController.show') // Nota o ':id' para indicar o parâmetro


}).prefix('api')


Route.group(() => {
  Route.post('/payment', 'PaymentController.createPayment');
  Route.get('/sessao-pagseguro', 'PaymentController.getSessionId');
  Route.post('/create_preference', 'PaymentController.createPreference');
  Route.post('/process_payment', 'PaymentController.processPayment');
  Route.post('/monthly_payment', 'PaymentController.createMonthlySubscription');
  Route.post('chamados', 'ChamadoController.store').middleware(['auth']);
  Route.put('/chamados/:id', 'ChamadoController.update').middleware(['auth']);

}).prefix('api')

Route.post('/chatbot', 'ChatbotController.sendMessage');
