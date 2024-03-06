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

    await Mail.send('emails.contact', { name, message }, (message) => {
      message
        .to('contato@marquei.com.br')
        .from(email)
        .subject('Mensagem de Contato');
    });
  }


}

module.exports = WelcomeEmailController;
