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
}

module.exports = WelcomeEmailController;
