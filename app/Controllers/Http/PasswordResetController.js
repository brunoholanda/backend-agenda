const User = use('App/Models/User');
const Mail = use('Mail');
const { randomBytes } = require('crypto');
const { promisify } = require('util');

class PasswordResetController {
  async requestReset({ request, response }) {
    const email = request.input('email');
    const user = await User.findBy('username', email);

    if (user) {
      const randomBytesPromisified = promisify(randomBytes);
      const token = (await randomBytesPromisified(20)).toString('hex');
      user.reset_token = token;
      user.token_expires_at = new Date(Date.now() + 60 * 60 * 1000); // Token expires in 1 hour
      await user.save();

      const resetUrl = `http://localhost:3000/reset-password/${token}`;

      await Mail.send('emails.reset_password', { user, resetUrl }, (message) => {
        message.to(user.username)
               .from('<from-email>')
               .subject('Password Reset');
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

    user.password = await Hash.make(newPassword);
    user.reset_token = null;
    user.token_expires_at = null;
    await user.save();

    return response.send({ message: 'Your password has been reset successfully.' });
  }
}

module.exports = PasswordResetController;
