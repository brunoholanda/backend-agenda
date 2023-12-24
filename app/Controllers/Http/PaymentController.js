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
      console.log(error);
      return response.status(500).send('Erro ao processar pagamento.');
    }
  }


}

module.exports = PaymentController;
