'use strict'

const Professional = use('App/Models/Professional')
const Database = use('Database')
const Hash = use('Hash')

class ProfessionalController {
  // Método para criar um profissional

  async store({ request, response }) {
    const data = request.only([
      'nome', 'cpf', 'data_de_nascimento', 'registro_profissional', 'celular',
      'assinatura', 'cep', 'endereco', 'numero', 'referencia',
      'cidade', 'estado', 'titulo', 'company_id', 'login'
    ]);

    const senha = request.input('senha');

    try {
      // Aplicar hash à senha
      const hashedSenha = await Hash.make(senha);

      // Criar profissional com a senha hashed
      const professional = await Professional.create({ ...data, senha: hashedSenha });
      return response.status(201).json(professional);
    } catch (error) {
      console.error("Erro ao inserir profissional no banco de dados:", error);
      return response.status(500).json({ error: 'Erro ao inserir profissional no banco de dados.' });
    }
  }


  // Método para listar profissionais
  async index({ request, response }) {
    const companyId = request.input('company_id');

    if (!companyId) {
      return response.status(400).json({ error: 'O ID da empresa é necessário.' });
    }

    try {
      const professionals = await Professional.query()
        .where('company_id', companyId)
        .fetch();
      return response.status(200).json(professionals);
    } catch (error) {
      console.error("Erro ao obter profissionais:", error);
      return response.status(500).json({ error: 'Erro ao obter profissionais.' });
    }
  }

  // Método para mostrar um profissional específico
  async show({ params, response }) {
    try {
      const professional = await Professional.find(params.id);

      if (!professional) {
        return response.status(404).json({ error: 'Profissional não encontrado.' });
      }

      return response.status(200).json(professional);
    } catch (error) {
      console.error("Erro ao obter profissional:", error);
      return response.status(500).json({ error: 'Erro ao obter profissional.' });
    }
  }

  // Método para atualizar um profissional
  async update({ params, request, response }) {
    const id = params.id;
    const data = request.only([
      'nome', 'cpf', 'data_de_nascimento', 'registro_profissional', 'celular',
      'assinatura', 'cep', 'endereco', 'numero', 'referencia',
      'cidade', 'estado', 'titulo', 'company_id'
    ]);

    try {
      const professional = await Professional.find(id);

      if (!professional) {
        return response.status(404).json({ message: 'Profissional não encontrado' });
      }

      const senha = request.input('senha');
      if (senha) {
        // Aplicar hash à nova senha
        professional.senha = await Hash.make(senha);
      }
      professional.merge(data);
      await professional.save();

      return response.status(200).json({ message: 'Profissional atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao tentar atualizar:', error);
      return response.status(500).json({ error: 'Erro ao atualizar profissional.' });
    }
  }

  // Método para deletar um profissional
  async destroy({ params, response }) {
    const id = params.id;

    try {
      const professional = await Professional.find(id);

      if (!professional) {
        return response.status(404).json({ message: 'Profissional não encontrado' });
      }

      await professional.delete();
      return response.status(200).json({ message: 'Profissional deletado com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar profissional:", error);
      return response.status(500).json({ error: 'Erro ao deletar profissional.' });
    }
  }

  async authenticate({ request, response }) {
    const { login, senha } = request.only(['login', 'senha']);

    const professional = await Professional.findBy('login', login);

    if (professional && await Hash.verify(senha, professional.senha)) {
      // Se a autenticação for bem-sucedida, inclua o professional_id na resposta
      return response.json({
        autenticado: true,
        professional_id: professional.id, // Adicione o professional_id aqui
      });
    }

    return response.status(401).json({ autenticado: false, mensagem: 'Credenciais inválidas' });
  }

}

module.exports = ProfessionalController
