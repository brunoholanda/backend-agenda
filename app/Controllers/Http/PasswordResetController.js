const User = use('App/Models/User');
const Professional = use('App/Models/Professional')
const Mail = use('Mail');
const Hash = use('Hash');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const Env = use('Env');
const Company = use('App/Models/Company')


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
      user.token_expires_at = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();

      const company = await Company.find(user.company_id);
      const companyName = company ? company.nome : 'Sua Empresa';

      const resetUrl = `https://marquei.com.br/#/reset-password/${token}`;

      await Mail.send(
        'emails.reset_password',
        {
          resetUrl,
          companyName,
          username: user.username
        },
        (message) => {
          message
            .to(user.username)
            .from('contato@marquei.com.br')
            .subject('Reiniciar Senha Marquei');
        }
      );
    }

    return response.send({ message: 'Se o seu email estiver registrado, você receberá um link para redefinição de senha.' });
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

  async requestResetForDoctor({ request, response }) {
    const email = request.input('email');
    const professional = await Professional.findBy('email', email);

    if (professional) {
      const randomBytesPromisified = promisify(randomBytes);
      const token = (await randomBytesPromisified(20)).toString('hex');
      professional.reset_token = token;
      professional.token_expires_at = new Date(Date.now() + 60 * 60 * 1000);
      await professional.save();

      const company = await Company.find(professional.company_id);
      const companyName = company ? company.nome : 'Sua Empresa';

      const resetUrl = `https://marquei.com.br/#/reset-password-doctor/${token}`;

      await Mail.send(
        'emails.reset_doctor_pass',
        {
          resetUrl,
          companyName,
          username: professional.login
        },
        (message) => {
          message
            .to(professional.email)
            .from('contato@marquei.com.br')
            .subject('Reiniciar Senha Marquei');
        }
      );
    }

    return response.send({ message: 'Se o seu email estiver registrado, você receberá um link para redefinição de senha.' });
  }

  async resetPasswordForDoctor({ request, response }) {
    const { token, newPassword } = request.only(['token', 'newPassword']);
    const professional = await Professional.findBy('reset_token', token);

    if (!professional) {
      return response.status(400).send({ message: 'This password reset token is invalid.' });
    }

    const tokenExpired = new Date(professional.token_expires_at).getTime() < Date.now();

    if (tokenExpired) {
      return response.status(400).send({ message: 'This password reset token has expired.' });
    }

    const hashedSenha = await Hash.make(newPassword);

    professional.senha = hashedSenha;
    professional.reset_token = null; // Clear the reset token
    professional.token_expires_at = null; // Clear the token expiry
    await professional.save(); // Save the updated professional

    return response.send({ message: 'Your password has been reset successfully.' });

  }
}

module.exports = PasswordResetController;
