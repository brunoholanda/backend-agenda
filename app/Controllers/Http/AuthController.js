'use strict'

const User = use('App/Models/User')
const Company = use('App/Models/Company')
const Hash = use('Hash')

class AuthController {
  async register({ request, response }) {
    console.log('Método register chamado');

    const { username, password, company_id } = request.only(['username', 'password', 'company_id'])
    console.log('Dados recebidos:', { username, company_id }); // Debug

    // Validação manual
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

    console.log('Tentativa de login:', { username }); // Log do username

    // Validação manual
    if (!username || !password) {
      console.log('Falta de dados de login:', { username, password });
      return response.status(400).send('Username e password são obrigatórios');
    }

    try {
      // Procura o usuário pelo nome de usuário
      const user = await User.query()
        .where('username', username)
        .first();

      if (!user) {
        console.log('Usuário não encontrado para:', username); // Log para usuário não encontrado
        return response.status(404).json({ message: 'Usuário não encontrado' });
      }

      console.log('Usuário encontrado, verificando senha'); // Log para usuário encontrado
      console.log('Senha fornecida:', password);
      console.log('Senha armazenada:', user.password);

      const passwordVerified = await Hash.verify(password, user.password);

      console.log('Resultado da verificação da senha:', passwordVerified); // Adicionado log para resultado da verificação

      if (!passwordVerified) {
        console.log('Falha na verificação da senha para:', username); // Log para falha na verificação da senha
        return response.status(400).json({ message: 'Credenciais inválidas' });
      }

      console.log('Senha verificada com sucesso para:', username); // Log para sucesso na verificação da senha

      const token = await auth.generate(user);

      return response.json({
        token: token.token,
        company_id: user.company_id
      });
    } catch (error) {
      console.error('Erro no login:', error); // Log detalhado do erro
      return response.status(500).json({ message: 'Algo deu errado', error });
    }
  }
}

module.exports = AuthController
