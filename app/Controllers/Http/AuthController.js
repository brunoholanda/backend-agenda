'use strict'

const User = use('App/Models/User')
const Company = use('App/Models/Company')
const Hash = use('Hash')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserSpecialty = use('App/Models/UserSpecialty')

class AuthController {

  async generateTempToken({ request, response }) {
    const { email } = request.post();

    try {
      const user = await User.findBy('username', email);

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const token = jwt.sign({ userId: user.id }, 'sua_chave_secreta', {
        expiresIn: '7d', // Define a expiração para 7 dias
      });

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

    if (!username || !password) {
      return response.status(400).send('Username e password são obrigatórios');
    }

    try {
      const user = await User.query()
        .where('username', username)
        .first();

      if (!user) {
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }

      const passwordVerified = await Hash.verify(password, user.password);


      if (!passwordVerified) {
        console.log('Falha na verificação da senha para:', username);
        return response.status(400).json({ message: 'Credenciais inválidas' });
      }

      const tokenExpired = new Date() > new Date(user.token_expiration);
      if (tokenExpired) {
        return response.status(401).json({ message: 'Token inválido ou expirado' });
      }

      // Busca das especialidades do usuário
      const userSpecialties = await UserSpecialty
        .query()
        .where('user_id', user.id)
        .pluck('specialty_id');

      // Geração do token JWT incluindo as especialidades do usuário
      const token = await auth.generate(user, {
        user_id: user.id,
        specialties: userSpecialties
      });

      // Inclusão das especialidades na resposta
      return response.json({
        token: token.token,
        company_id: user.company_id,
        user_specialties: userSpecialties
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return response.status(500).json({ message: 'Algo deu errado', error });
    }
  }

  async checkEmail({ request, response }) {
    const { username } = request.only(['username']);

    try {
      const user = await User.findBy('username', username);

      if (user) {
        return response.json({ exists: true });
      } else {
        return response.json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking username:", error);
      return response.status(500).json({ message: 'Error checking username', error });
    }
  }

  async getCompanyInfo({ auth, response }) {
    try {
      const user = await auth.getUser();
      const company = await Company.find(user.company_id);

      if (!company) {
        return response.status(404).json({ message: 'Empresa não encontrada.' });
      }

      const userSpecialties = await UserSpecialty
        .query()
        .where('user_id', user.id)
        .pluck('specialty_id');

      return response.status(200).json({
        ...company.toJSON(), // Espalha todos os detalhes da empresa na resposta
        user_specialties: userSpecialties // Inclui as especialidades do usuário na resposta
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes da empresa:', error);
      return response.status(500).json({ message: 'Erro ao buscar detalhes da empresa.', error });
    }
  }

}

module.exports = AuthController
