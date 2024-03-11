'use strict'

const Redis = use('Redis')

Redis.subscribe('news_channel', (message) => {
  console.log(message)
})

module.exports = Redis
