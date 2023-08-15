const envConfig = require('../env.config');
console.log(envConfig)


module.exports = {
  mongodb: {
    connectTo: (database) => `mongodb+srv://user1:${envConfig.DB_PASSWORD}@epicgamerworld.kklvu6n.mongodb.net/${database}?retryWrites=true&w=majority`,
  }
}