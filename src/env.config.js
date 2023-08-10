require('dotenv').config();

module.exports = {
    DB_NAME: process.env.DB_NAME || 'test',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
  }