'use strict'

const UserSpecialty = use('App/Models/UserSpecialty')

class UserSpecialtyController {
  async associate ({ request, response }) {
    const { userId, specialties } = request.only(['userId', 'specialties'])

    try {
      const associations = specialties.map(specialtyId => {
        return { user_id: userId, specialty_id: specialtyId }
      })

      await UserSpecialty.createMany(associations)

      return response.status(200).json({
        message: 'Especialidades associadas com sucesso!'
      })
    } catch (error) {
      return response.status(400).json({
        error: 'Erro ao associar especialidades'
      })
    }
  }
}

module.exports = UserSpecialtyController
