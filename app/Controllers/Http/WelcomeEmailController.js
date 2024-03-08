const Mail = use('Mail');
const User = use('App/Models/User');

class WelcomeEmailController {
  async sendWelcomeEmail({ request }) {
    const email = request.input('email');
    const user = await User.findBy('username', email);

    if (user) {
      await Mail.send('emails.welcome', { user }, (message) => {
        message
          .to(user.username)
          .from('contato@marquei.com.br')
          .subject('Bem-vindo(a) ao Marquei!');
      });
    }
  }

  async sendContactEmail({ request }) {
    const { name, email, message } = request.only(['name', 'email', 'message']);

    await Mail.send('emails.contact', { name, email, message }, (message) => {
      message
        .to('contato@marquei.com.br')
        .from('contato@marquei.com.br')
        .replyTo(email)
        .subject('Mensagem de Contato');
    });

    await Mail.send('emails.confirmation', { name }, (message) => {
      message
        .to(email)
        .from('contato@marquei.com.br')
        .subject('Confirmação de Recebimento - Marquei');
    });
  }



}

module.exports = WelcomeEmailController;
