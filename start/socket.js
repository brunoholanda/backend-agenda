'use strict'

const Server = use('Server')
const httpServer = Server.getInstance()
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "marquei.com.br",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on('join', (channel) => {
    if (channel === 'calendar') {
      socket.join(channel);
    }
  });

  socket.on('disconnect', () => {
  });

});

module.exports = io;
