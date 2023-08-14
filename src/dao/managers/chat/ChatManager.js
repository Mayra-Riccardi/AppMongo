const fs = require('fs/promises')

const chatModel = require('../../models/ChatModel')

class ChatManager{
    async addMessage(message){
        const fecha = new Date()
        const messageNew = {user: message.user, text: message.message, datetime: fecha.toLocaleTimeString('en-US') }
        console.log(messageNew)
        return await chatModel.create(messageNew)
        
    }
    async getMessages() {
        try {
          const messages = await chatModel.find().lean();
          console.log(messages);
          return messages;
        } catch (error) {
          console.error('Error getting messages:', error);
          throw error; // Puedes re-lanzar el error para manejarlo en otro nivel si es necesario
        }
      }
      

}

module.exports = new ChatManager()