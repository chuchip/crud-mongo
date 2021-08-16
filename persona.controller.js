const db = require('./database').db;
const PATH="/persona"
const COLLECTION="persona"

async function  addPersona(req, res)
{
    
    const cuerpo = req.body;
    strBody=JSON.stringify(cuerpo);
    logger.debug("En addPersona: ");
    try {
      
      //const persona= await db.collection(COLLECTION).insertOne({name: cuerpo.name,surname: cuerpo.surname    });
      const persona= await db.collection(COLLECTION).insertOne(strBody);
      res.status(201).send(persona);
    } catch (ex)
    {
      res.status(501).send("Error at addPersona: "+ex.message);
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
async function  getPersona(req, res)
{
  try
  {
    logger.debug("En getPersona: ");
    const cursorPersonas=await db.collection(COLLECTION).find();
    await sleep(5000)
    const personas=await cursorPersonas.toArray();
    
    res.status(201).send(personas);
  } catch (ex)
  {
    res.status(501).send("Error at getPersona: "+ex.message);
  }
}
exports.addControllers=function addControllers(app)
{
  app.route(PATH).post(addPersona);
  app.get(PATH,getPersona);
}