const Env = use('Env');
const axios = require('axios');
const User = use('App/Models/User');

class PagSeguroController {
  // Função para iniciar um pagamento
  async createPayment({ request, response }) {
    const { userId, valor } = request.only(['userId', 'valor']);

    // Aqui você configura e envia a requisição para o PagSeguro
    // Incluindo detalhes do pagamento, como valor, descrição, etc.

    return response.json({ message: 'Pagamento iniciado', paymentUrl: 'URL_do_PagSeguro' });
  }

  // Função para lidar com notificações do PagSeguro
  async notification({ request, response }) {
    const notificationCode = request.input('notificationCode');
    const notificationType = request.input('notificationType');

    if (notificationType === 'transaction') {
      // Verifique a notificação com o PagSeguro
      const validationResponse = await this.validateNotification(notificationCode);

      // Se for um pagamento bem-sucedido, atualize o token
      if (validationResponse.status === 'Pago') {
        const userId = validationResponse.userId; // Exemplo, você precisará obter o ID do usuário de outra forma
        await this.updateUserToken(userId);
      }
    }

    return response.json({ message: 'Notificação recebida e processada' });
  }

  // Função auxiliar para validar a notificação com o PagSeguro
  async validateNotification(notificationCode) {
    // Envie uma requisição ao PagSeguro para validar a notificação
    // Retorne os detalhes da transação
    // Este é um exemplo, você precisará implementar a lógica de acordo com a API do PagSeguro
  }

  // Função auxiliar para atualizar o token do usuário
  async updateUserToken(userId) {
    const user = await User.find(userId);
    user.token_expiration = new Date(new Date().setDate(new Date().getDate() + 31));
    await user.save();
  }
}

module.exports = PagSeguroController;
