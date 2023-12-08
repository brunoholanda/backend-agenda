'use strict'

const Specialty = use('App/Models/Specialty')

class SpecialtySeeder {
  async run () {
    const specialties = ['Médico', 'Dentista', 'Psicólogo', 'Fisioterapeuta', 'Nutricionista']

    for (const name of specialties) {
      await Specialty.create({ name })
    }
  }
}

module.exports = SpecialtySeeder
