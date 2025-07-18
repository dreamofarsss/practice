const express = require('express');
const settings = require('./config/settings');
const {connectToMongoDb, connectToPostgres, pgQuery} = require('./config/db');

const app = express();

const startServer = async() => {
    try{
        await connectToMongoDb();
        await connectToPostgres();

        app.listen(settings.PORT, () => console.log(`Server started at port ${settings.PORT}`));
    }catch(err){
        console.log(`Can't start the server\n`, err.stack);
    }
    
}

startServer();

