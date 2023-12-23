const { MercadoPagoConfig, Payment } = require('mercadopago');
const Env = use('Env');
class PaymentController {
 async createPreference({ request, response }) {
    // Aqui você pode adaptar os dados da preferência conforme necessário
    let preference = {
      items: [
        {
          id: 'item-ID-1234',
          title: 'Meu produto',
          currency_id: 'BRL',
          picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
          description: 'Descrição do Item',
          category_id: 'art',
          quantity: 1,
          unit_price: 75.76
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
          payment_method_id: request.input('paymentMethodId'),
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
      console.log(error);
      return response.status(500).send('Erro ao processar pagamento.');
    }
  }


}

module.exports = PaymentController;
