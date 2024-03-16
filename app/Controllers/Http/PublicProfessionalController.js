'use strict'

const PublicProfessional = use('App/Models/PublicProfessional')
const Helpers = use('Helpers');
const fs = require('fs')
const util = require('util'); // Necessário para promisificar funções
const unlinkAsync = util.promisify(fs.unlink);
class PublicProfessionalController {
// Dentro do PublicProfessionalController
async index({ request, response }) {
  try {
      const { especialidade, cidade } = request.get();

      const query = PublicProfessional.query();

      if (especialidade) {
          query.where('especialidade', especialidade);
      }

      if (cidade) {
          query.where('cidade', cidade);
      }

      const professionals = await query.fetch();

      return response.json(professionals);
  } catch (error) {
      return response.status(500).json({ error: error.message });
  }
}


  async store({ request, response }) {
    try {
      const email = request.input('email');
      let professional = await PublicProfessional.findBy('email', email);

      const profilePic = request.file('foto', {
        types: ['image'],
        size: '1mb'
      });

      if (!professional) {
        professional = new PublicProfessional();
      } else if (profilePic) {
        const fs = Helpers.promisify(require('fs'));
        const previousPicPath = Helpers.publicPath(professional.foto);
        if (fs.existsSync(previousPicPath)) {
          await fs.unlink(previousPicPath);
        }
      }

      if (profilePic) {
        await profilePic.move(Helpers.publicPath('uploads/ProfileDoctor'), {
          name: `${new Date().getTime()}.${profilePic.subtype}`,
          overwrite: true
        });

        if (!profilePic.moved()) {
          return profilePic.error();
        }

        professional.foto = `uploads/ProfileDoctor/${profilePic.fileName}`;
      }

      professional.merge(request.only([
        'nome', 'telefone', 'especialidade',
        'registro_profissional', 'titulo', 'planos_que_atende',
        'endereco', 'numero', 'bairro', 'cidade', 'uf', 'cep',
        'instagram', 'email', 'professional_id', 'atendimento', 'company_id'
      ]));

      await professional.save();
      return response.status(200).json(professional);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }


  async show({ params, response }) {
    try {
      const professional = await PublicProfessional.findOrFail(params.id)
      return response.json(professional)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async update({ params, request, response }) {
    try {
        // Obtém o ID do perfil público do parâmetro da rota
        const profilePublicId = params.id;
        const professionalPublic = await PublicProfessional.find(profilePublicId);

        if (!professionalPublic) {
            return response.status(404).json({ message: 'Perfil profissional público não encontrado.' });
        }

        const data = request.only([
            'nome', 'telefone', 'email', 'especialidade',
            'registro_profissional', 'titulo', 'planos_que_atende',
            'endereco', 'numero', 'bairro', 'cidade', 'uf', 'cep',
            'instagram', 'atendimento', 'company_id'
        ]);

        const profilePic = request.file('foto', {
            types: ['image'],
            size: '1mb'
        });

        if (profilePic) {
            const oldPic = professionalPublic.foto;

            const fileName = `${new Date().getTime()}.${profilePic.subtype}`;
            await profilePic.move(Helpers.publicPath('uploads/ProfileDoctor'), {
                name: fileName,
                overwrite: true
            });

            if (!profilePic.moved()) {
                return response.status(500).json({ error: profilePic.error() });
            }

            if (oldPic) {
                const oldPicPath = Helpers.publicPath(oldPic);
                if (fs.existsSync(oldPicPath)) {
                    await unlinkAsync(oldPicPath);
                }
            }

            professionalPublic.foto = `uploads/ProfileDoctor/${fileName}`;
        }

        professionalPublic.merge(data);
        await professionalPublic.save();

        return response.json(professionalPublic);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}


  async showByProfessionalId({ params, response }) {
    try {
      const professionalId = params.professional_id;

      const professional = await PublicProfessional.findBy('professional_id', professionalId);

      if (professional) {
        return response.json(professional);
      } else {
        return response.status(404).json({ message: 'Perfil profissional não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
    }
  }

  async search({ request, response }) {
    try {
      const { especialidade, cidade } = request.get();

      const query = PublicProfessional.query();

      if (especialidade) {
        query.where('especialidade', 'ILIKE', `%${especialidade}%`);
      }

      if (cidade) {
        // 'ILIKE' para PostgreSQL
        query.where('cidade', 'ILIKE', `%${cidade}%`);
      }

      const professionals = await query.fetch();
      return response.json(professionals);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }


  async destroy({ params, response }) {
    try {
      const professional = await PublicProfessional.findOrFail(params.id)
      await professional.delete()
      return response.status(200).send({ message: 'Professional deleted successfully.' })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }
}

module.exports = PublicProfessionalController
