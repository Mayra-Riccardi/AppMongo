const chatManager = require('../dao/managers/chat/ChatManager')

async function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('request-messages', async () => {
    try {
      const messages = await chatManager.getMessages();
      if (messages) {
        socket.emit('all-messages', messages);
      }
    } catch (error) {
      console.error('Error getting messages:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('send-message', async (msg) => {
    // guardar el mensaje en la DB
    await chatManager.addMessage(msg)
    socket.broadcast.emit('receive-message', msg)
  })

}

module.exports = socketManager