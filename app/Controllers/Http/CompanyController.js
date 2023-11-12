'use strict'

const Company = use('App/Models/Company')

class CompanyController {
    // Método para criar uma empresa
    async store({ request, response }) {
        const { nome, cnpj } = request.only(['nome', 'cnpj']);

        try {
            const company = await Company.create({ nome, cnpj });
            return response.status(201).json(company);
        } catch (error) {
            console.error("Erro ao inserir empresa no banco de dados:", error);
            return response.status(500).json({ error: 'Erro ao inserir empresa no banco de dados.' });
        }
    }

    // Método para listar todas as empresas
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
        const data = request.only(['nome', 'cnpj']);

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
