'use strict'

const User = use('App/Models/User')
const Company = use('App/Models/Company')
const Hash = use('Hash')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class AuthController {

  async generateTempToken({ request, response }) {
    const { email } = request.post();

    try {
      // Verifique se o email existe na base de dados (você pode personalizar essa lógica)
      const user = await User.findBy('username', email);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Gere um token temporário usando JWT
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const token = jwt.sign({ userId: user.id }, 'sua_chave_secreta', {
        expiresIn: '7d', // Define a expiração para 7 dias
      });

      // Retorne o token no response
      return response.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao gerar o Token de Acesso Temporário:', error);
      return response.status(500).json({ error: 'Erro ao gerar o Token de Acesso Temporário' });
    }
  }


  async register({ request, response }) {

    const { username, password, company_id } = request.only(['username', 'password', 'company_id'])

    if (!username || !password || !company_id) {
      return response.status(400).send('Todos os campos são obrigatórios')
    }

    // Verificar unicidade do username
    const userExists = await User.findBy('username', username);
    if (userExists) {
      return response.status(400).send('Username já está em uso')
    }

    // Verificar existência do company_id
    const companyExists = await Company.findBy('company_id', company_id);
    if (!companyExists) {
      return response.status(400).send('Empresa não encontrada')
    }

    try {
      const user = await User.create({ username, password, company_id })

      console.log('Usuário criado:', user); // Debug

      return response.status(201).json(user)
    } catch (error) {
      console.error('Erro durante o registro:', error); // Log detalhado
      return response.status(500).json({ message: 'Erro interno no servidor', error: error.message })
    }
  }

  async login({ request, auth, response }) {
    const { username, password } = request.all();

    console.log('Tentativa de login:', { username });

    if (!username || !password) {
      console.log('Falta de dados de login:', { username, password });
      return response.status(400).send('Username e password são obrigatórios');
    }

    try {
      const user = await User.query()
        .where('username', username)
        .first();

      if (!user) {
        console.log('Usuário não encontrado para:', username);
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }

      console.log('Usuário encontrado, verificando senha');
      console.log('Senha fornecida:', password);
      console.log('Senha armazenada:', user.password);

      const passwordVerified = await Hash.verify(password, user.password);

      console.log('Resultado da verificação da senha:', passwordVerified);

      if (!passwordVerified) {
        console.log('Falha na verificação da senha para:', username);
        return response.status(400).json({ message: 'Credenciais inválidas' });
      }
      console.log('Data e hora atual:', new Date());
      console.log('Data de expiração do token:', user.token_expiration);

      // Verifique se o usuário possui um token válido
      if (!user.token || user.token_expiration <= new Date()) {
        console.log('Token inválido ou expirado para:', username);
        return response.status(401).json({ message: 'Token inválido ou expirado' });
      }
      // Verifique se o usuário possui um token válido
      if (user.token_expiration && user.token_expiration <= new Date()) {
        console.log('Token inválido ou expirado para:', username);
        return response.status(401).json({ message: 'Token inválido ou expirado' });
      }

      // Autentique o usuário
      const token = await auth.attempt(username, password);

      return response.json({
        token: token.token,
        company_id: user.company_id
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return response.status(500).json({ message: 'Algo deu errado', error });
    }
  }


}

module.exports = AuthController
