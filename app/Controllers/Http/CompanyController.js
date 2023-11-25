'use strict'

const Company = use('App/Models/Company')
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')
const crypto = require('crypto');

class CompanyController {
  async store({ request, response }) {
    const { companyData, userData } = request.post();

    const trx = await Database.beginTransaction();

    try {
      // Verificar se o CNPJ já está em uso
      const existingCompany = await Company.findBy('cnpj', companyData.cnpj);
      if (existingCompany) {
        await trx.rollback();
        return response.status(409).json({ error: 'CNPJ já existe em nosso sistema !' });
      }

      // Verificar se o e-mail já está em uso como username
      const existingUser = await User.findBy('username', userData.email);
      if (existingUser) {
        await trx.rollback();
        return response.status(409).json({ error: 'E-mail já exite em nosso sistema !' });
      }

      const company = await Company.create(companyData, trx);

      const token = crypto.randomBytes(16).toString('hex');

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      const user = await User.create({
        username: userData.email,
        password: userData.password,
        company_id: company.company_id, // Isso deve ser company.id e não company.company_id, a menos que sua tabela realmente tenha um campo company_id
        token: token,
        token_expiration: expirationDate,
      }, trx);

      // Confirmar a transação
      await trx.commit();

      // Responder com sucesso
      return response.status(201).json({ company, user });
    } catch (error) {
      // Desfazer a transação em caso de erro
      await trx.rollback();

      console.error("Erro ao inserir empresa e usuário no banco de dados:", error);
      return response.status(500).json({ error: 'Erro ao inserir empresa e usuário no banco de dados.' });
    }
  }


  async index({ response }) {
    try {
      const companies = await Company.all();
      return response.status(200).json(companies);
    } catch (error) {
      console.error("Erro ao obter empresas:", error);
      return response.status(500).json({ error: 'Erro ao obter empresas.' });
    }
  }

  // Método para mostrar uma empresa específica
  async show({ params, response }) {
    const company_id = params.company_id;

    try {
      const company = await Company.find(company_id);

      if (!company) {
        return response.status(404).json({ error: 'Empresa não encontrada.' });
      }

      return response.status(200).json(company);
    } catch (error) {
      console.error("Erro ao obter empresa:", error);
      return response.status(500).json({ error: 'Erro ao obter empresa.' });
    }
  }

  // Método para atualizar uma empresa
  async update({ params, request, response }) {

    const company_id = params.company_id;
    const data = request.only(['nome', 'cnpj', 'telefone', 'endereco']);

    try {
      const company = await Company.find(company_id);

      if (!company) {
        return response.status(404).json({ error: 'Empresa para atualizar não encontrada.' });
      }

      company.merge(data);
      await company.save();

      return response.status(200).json({ message: 'Empresa atualizada com sucesso!', company });
    } catch (error) {
      console.error('Erro ao tentar atualizar a empresa:', error);
      return response.status(500).json({ error: 'Erro ao atualizar empresa.' });
    }
  }


  // Método para deletar uma empresa
  async destroy({ params, response }) {
    const company_id = params.company_id;

    try {
      const company = await Company.find(company_id);

      if (!company) {
        return response.status(404).json({ error: 'Empresa não encontrada.' });
      }

      await company.delete();
      return response.status(200).json({ message: 'Empresa deletada com sucesso!' });
    } catch (error) {
      console.error("Erro ao deletar empresa:", error);
      return response.status(500).json({ error: 'Erro ao deletar empresa.' });
    }
  }
}

module.exports = CompanyController
