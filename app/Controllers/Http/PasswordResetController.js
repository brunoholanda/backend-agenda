const User = use('App/Models/User');
const Mail = use('Mail');
const Hash = use('Hash');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const Env = use('Env');


class PasswordResetController {
  async requestReset({ request, response }) {
    const recaptchaToken = request.input('recaptchaToken');
    const email = request.input('email');
    const user = await User.findBy('username', email);

    if (!recaptchaToken) {
      return response.status(400).send('Token do reCAPTCHA é obrigatório.');
    }

    const secretKey = Env.get('CHAVE_CAPTCHA');
    const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`, {
      method: 'POST',
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return response.status(400).json({ message: 'Falha na verificação do reCAPTCHA.' });
    }

    if (user) {
      const randomBytesPromisified = promisify(randomBytes);
      const token = (await randomBytesPromisified(20)).toString('hex');
      user.reset_token = token;
      user.token_expires_at = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour
      await user.save();

      const resetUrl = `https://marquei.com.br/#/reset-password/${token}`;

      await Mail.send('emails.reset_password', { user, resetUrl }, (message) => {
        message.to(user.username)
               .from('contato@marquei.com.br')
               .subject('Reiniciar Senha Marquei');
      });
    }

    return response.send({ message: 'If your email is registered, you will receive a password reset link.' });
  }

  async resetPassword({ request, response }) {
    const { token, newPassword } = request.only(['token', 'newPassword']);
    const user = await User.findBy('reset_token', token);

    const tokenExpired = user.token_expires_at.getTime() < Date.now();

    if (!user || tokenExpired) {
      return response.status(400).send({ message: 'This password reset token is invalid or has expired.' });
    }

    user.password = newPassword;
    user.reset_token = null;
    user.token_expires_at = null;
    await user.save();

    return response.send({ message: 'Your password has been reset successfully.' });
  }
}

module.exports = PasswordResetController;
