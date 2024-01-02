const Service = use('App/Models/Service')

class ServiceSeeder {
  async run () {
    await Service.createMany([
      {
        plan: 'Plus',
        price: 69.99,
        originalPrice: 119,
        anualPrice: 699.90,
        persons: 1,
        duration: 12,
        mostSold: true,
        preapproval_plan_id: '2c9380848cb7771b018cc05762c20160',
      },
      {
        plan: 'Pro',
        price: 99.99,
        originalPrice: 159,
        anualPrice: 999.90,
        persons: 5,
        duration: 12,
        mostSold: false,
        preapproval_plan_id: '2c9380848cb7771b018cc058e3b50161',

      },
      {
        plan: 'Premium',
        price: 189.99,
        originalPrice: 299,
        anualPrice: 1899.90,
        persons: 10,
        duration: 12,
        mostSold: false,
        preapproval_plan_id: '2c9380848cb7774b018cc05934cf0195',

      },
      {
        plan: 'Plano Teste',
        price: 0,
        originalPrice: 0,
        anualPrice: 0,
        persons: 1,
        duration: 12,
        mostSold: false
      }
    ])
  }
}

module.exports = ServiceSeeder
