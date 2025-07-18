const settings = require('./settings');
const {Client, Pool} = require('pg');
const mongoose = require('mongoose');

const requiredEnvVars = ['MONGODB_URI', 'PG_DATNAME'];

requiredEnvVars.forEach(envVar => {
    if(!settings[envVar]){
        console.log(`Missing environment variable: ${envVar}\n Pleae Check the .env file`);
        process.exit(1);
    }
})

const connectToMongoDb = async() => {
    try{
        await mongoose.connect(settings.MONGODB_URI);
        console.log("succesfully connected to MongoDB")
    }catch(err){
        console.log(`Failed to connect to MongoDB\n`, err.stack);
        process.exit(1)
    }
}

const connectToPostgres = async() => {
    const pgAdminClient = new Client({
        user: settings.PG_USER || 'postgres',   // using default psql credentials
        password: settings.PG_PASSWORD || ' ',
        database: 'postgres',
        host: settings.PG_HOSTNAME || 'localhost',
        port: settings.PG_PORT || 5432
    })

    try{
        await pgAdminClient.connect()
        console.log("Succesfully connected to Postgres as an admin! Checking if database exists...")
        const result = await pgAdminClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [settings.PG_DATNAME]);
        if(result.rowCount === 0){
            await pgAdminClient.query(`CREATE DATABASE ${settings.PG_DATNAME}`);
            console.log(`Database ${settings.PG_DATNAME} created successfully`)
        }else{
            console.log(`Database with name "${settings.PG_DATNAME}" already exists! please check the .env file configuration or drop the database and try again.`);
            process.exit(1)
        }
    }catch(err){
        console.log(`Failed to connect to Postgres\n`, err.stack);
        process.exit(1)
    } finally{
        await pgAdminClient.end()
    }
}
 

const pgPool = new Pool({
    user: settings.PG_USER|| 'postgres',
    password: settings.PG_PASSWORD || ' ',
    database: settings.PG_DATNAME,
    host: settings.PG_HOSTNAME || 'localhost',
    port: settings.PG_PORT || 5432
})
const pgQuery = async(text, data) => {
    try{
        return await pgPool.query(text, data);
    }catch(err){
        console.log("Can't handle your query", err.stack);
    }
}

module.exports = {connectToMongoDb, connectToPostgres, pgQuery }