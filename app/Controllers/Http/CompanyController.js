'use strict'

const Company = use('App/Models/Company')
const User = use('App/Models/User')
const Hash = use('Hash')
const Database = use('Database')
const crypto = require('crypto');
const fs = require('fs');
const Helpers = use('Helpers');


class CompanyController {
  async store({ request, response }) {
    const { companyData, userData } = request.post();

    const trx = await Database.beginTransaction();

    try {
      const existingCompany = await Company.findBy('cnpj', companyData.cnpj);
      if (existingCompany) {
        await trx.rollback();
        return response.status(409).json({ error: 'Numero do Documento já existe em nosso sistema !' });
      }

      const existingUser = await User.findBy('username', userData.email);
      if (existingUser) {
        await trx.rollback();
        return response.status(409).json({ error: 'E-mail já exite em nosso sistema !' });
      }

      companyData.service_id = companyData.service_id || 4; // Default to 7 if not provided

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

  async updatePaymentInfo({ auth, request, response }) {
    const { payment_type, payment_email, payment_confirm, service_id } = request.post();

    try {
      // Usando o auth para obter o usuário autenticado
      const user = auth.user;
      const company = await Company.find(user.company_id);

      if (!company) {
        return response.status(404).json({ error: 'Empresa não encontrada.' });
      }

      company.merge({
        payment_type,
        payment_confirm,
        service_id,
      });
      await company.save();

      return response.status(200).json({ message: 'Informações de pagamento atualizadas com sucesso!', company });
    } catch (error) {
      console.error('Erro ao atualizar informações de pagamento:', error);
      return response.status(500).json({ error: 'Erro interno ao atualizar informações de pagamento.' });
    }
  }


  async index({ response }) {
    try {
      // Realizar uma consulta que junta as tabelas companies e users e agrega a informação necessária
      const companiesWithLatestTokenExpiration = await Database
        .from('companies')
        .leftJoin('users', 'companies.company_id', 'users.company_id')
        .select('companies.*')
        .select(Database.raw('MAX(users.token_expiration) as token_expiration'))
        .groupBy('companies.company_id');

      return response.json(companiesWithLatestTokenExpiration);
    } catch (error) {
      console.error("Erro ao obter empresas com data de expiração do token:", error);
      return response.status(500).json({ error: 'Erro ao obter empresas com data de expiração do token.' });
    }
  }


  async show({ params, response }) {
    const company_id = params.company_id;

    try {
      // Encontrar a empresa pelo ID
      const company = await Company.find(company_id);

      if (!company) {
        return response.status(404).json({ error: 'Empresa não encontrada.' });
      }

      // Encontrar a data de expiração do token mais recente para usuários dessa empresa
      const tokenExpiration = await User
        .query()
        .where('company_id', company_id)
        .orderBy('token_expiration', 'desc')
        .first();

      // Se não encontrar nenhum usuário, retornar a empresa sem a data de expiração do token
      if (!tokenExpiration) {
        return response.status(200).json(company);
      }

      // Adicionar a data de expiração do token aos dados da empresa
      company.token_expiration = tokenExpiration.token_expiration;

      return response.status(200).json(company);
    } catch (error) {
      console.error("Erro ao obter empresa:", error);
      return response.status(500).json({ error: 'Erro ao obter empresa.' });
    }
  }

  async update({ params, request, response }) {
    const company_id = params.company_id;
    const data = request.only(['nome', 'cnpj', 'telefone', 'endereco', 'instagram', 'service_id', 'payment_confirm', 'payment_type']);

    const logo = request.file('logo', {
      types: ['image'],
      size: '500kb'
    });

    try {
      const company = await Company.find(company_id);
      if (!company) {
        return response.status(404).json({ error: 'Empresa para atualizar não encontrada.' });
      }

      if (logo) {
        if (company.logo_path) {
          const oldLogoPath = Helpers.publicPath(company.logo_path);
          if (fs.existsSync(oldLogoPath)) {
            fs.unlinkSync(oldLogoPath);
          }
        }

        const logoFileName = `${new Date().getTime()}.${logo.subtype}`;
        await logo.move('public/uploads/logos', {
          name: logoFileName,
          overwrite: true
        });

        if (!logo.moved()) {
          return response.status(400).json({ error: logo.error() });
        }

        data.logo_path = `uploads/logos/${logoFileName}`;
      }

      company.merge(data);
      await company.save();

      return response.status(200).json({ message: 'Empresa atualizada com sucesso!', company });
    } catch (error) {
      console.error('Erro ao tentar atualizar a empresa:', error);
      return response.status(500).json({ error: 'Erro ao atualizar empresa.' });
    }
  }


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

  async updateTokenExpiration({ params, request, response }) {
    const { company_id } = params;
    const { token_expiration } = request.only(['token_expiration']);

    try {
      const users = await User
        .query()
        .where('company_id', company_id)
        .update({ token_expiration: new Date(token_expiration) });

      if (users === 0) {
        return response.status(404).json({ message: 'Nenhum usuário encontrado para essa empresa.' });
      }

      return response.status(200).json({ message: 'Data de expiração do token atualizada com sucesso.' });
    } catch (error) {
      console.error("Erro ao atualizar a data de expiração do token:", error);
      return response.status(500).json({ error: 'Erro ao atualizar a data de expiração do token.' });
    }
  }


}

module.exports = CompanyController
