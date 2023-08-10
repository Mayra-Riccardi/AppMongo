const envConfig = require('../env.config');


module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://user1:${envConfig.DB_PASSWORD}@epicgamerworld.kklvu6n.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
}