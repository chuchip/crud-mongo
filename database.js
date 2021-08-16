const { MongoClient } = require('mongodb');
logger = require('./logger').logger
const DATABASE="db_estudiante"

function connect()
{
    logger.info("Connecting to mongo .... ");
    const db_user=process.env['DB_USER'] || 'chuchip'
    const db_pass=process.env.DB_PASS
    const db_url = process.env.DB_URL || "cluster0.4kcpz.mongodb.net/test_node?retryWrites=true&w=majority"
    // logger.debug(`Usuario: ${db_user} Contraseña: ${db_pass}`)
  
    const uri = `mongodb+srv://${db_user}:${db_pass}@${db_url}`;
    
    const client= new MongoClient(uri);
    try {
        client.connect();
        const db=client.db(DATABASE);
        logger.info("Connected to database!")
        return db;
    } catch (e)    {
        console.error(e);
    } finally {
        client.close();
    }
}

exports.db=connect();