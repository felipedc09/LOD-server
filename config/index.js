require('dotenv').config()

const config = {
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPwd: process.env.DB_PWD,
  dbUrl: process.env.DB_URL,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME
}

module.exports = config
