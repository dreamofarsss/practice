require('dotenv').config()

const settings = {
    PORT:process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    PG_DATNAME: process.env.PG_DATNAME,
    PG_USER: process.env.PG_USER,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_HOSTNAME: process.env.PG_HOSTNAME,
    PG_PORT: process.env.PG_PORT
}

module.exports = settings;