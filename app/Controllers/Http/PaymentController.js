const { MercadoPagoConfig, Payment } = require('mercadopago');
const mercadopago = require('mercadopago');

const Env = use('Env');
class PaymentController {

  constructor() {
    mercadopago.configure({
      access_token: Env.get('TOKEN_PG_PROD')
    });
  }

  async createPreference({ request, response }) {
    const { itemDetails } = request.only(['itemDetails']);

    // Converta unit_price para número
    itemDetails.unit_price = parseFloat(itemDetails.unit_price);
    if (isNaN(itemDetails.unit_price)) {
      return response.status(400).send({ error: 'Preço unitário inválido' });
    }

    let preference = {
      items: [
        {
          id: 'item-ID-1234',
          title: itemDetails.title,
          currency_id: 'BRL',
          picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
          description: itemDetails.description,
          category_id: 'art',
          quantity: 1,
          unit_price: itemDetails.unit_price
        }
      ],
    };

    try {
      const preferenceResult = await mercadopago.preferences.create(preference);
      return response.json({ id: preferenceResult.body.id });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error: 'Erro ao criar preferência de pagamento' });
    }
  }

  async createMonthlySubscription({ request, response }) {
    const { payer_email, card_token_id, preapproval_plan_id } = request.only([
      'payer_email',
      'card_token_id', // ID do token do cartão gerado no frontend
      'preapproval_plan_id' // ID do plano de assinatura pré-aprovado existente
    ]);

    // Validações básicas
    if (!payer_email || typeof payer_email !== 'string' || !payer_email.includes('@')) {
      return response.status(400).send({ error: 'Um e-mail válido é necessário para o pagador.' });
    }

    if (!card_token_id || typeof card_token_id !== 'string') {
      return response.status(400).send({ error: 'Um card_token_id válido é necessário.' });
    }

    if (!preapproval_plan_id || typeof preapproval_plan_id !== 'string') {
      return response.status(400).send({ error: 'Um preapproval_plan_id válido é necessário.' });
    }

    // Dados para assinar o usuário ao plano existente
    const subscriptionData = {
      preapproval_plan_id,
      card_token_id: 'e3ed6f098462036dd2cbabe314b9de2a', // Token fixo
      payer_email,
      status: "authorized"
    };

    // Tentar assinar o usuário ao plano existente
    try {
      const subscriptionResult = await mercadopago.preapproval.create(subscriptionData);

      // Retornar o resultado com o ID da assinatura
      return response.json({ id: subscriptionResult.response.id });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error: error.message || 'Erro desconhecido ao assinar o plano' });
    }
  }


  async processPayment({ request, response }) {
    const client = new MercadoPagoConfig({ accessToken: Env.get('TOKEN_PG_TESTE') });
    const payment = new Payment(client);

    try {
      const result = await payment.create({
        body: {
          transaction_amount: request.input('transaction_amount'),
          token: request.input('token'),
          description: request.input('description'),
          installments: request.input('installments'),
          payment_method_id: request.input('payment_method_id'),
          issuer_id: request.input('issuer'),
          payer: {
            email: request.input('email'),
            identification: {
              type: request.input('identificationType'),
              number: request.input('number')
            }
          }
        },
        requestOptions: { idempotencyKey: 'Unique_Idempotency_Key' }
      });
      return response.json(result);
    } catch (error) {
      return response.status(500).send('Erro ao processar pagamento.');
    }
  }


}

module.exports = PaymentController;
