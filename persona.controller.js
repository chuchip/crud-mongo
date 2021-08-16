const mongo = require('mongodb');
const db = require('./database').db;
const PATH="/persona"
const COLLECTION="persona"
const collection=db.collection(COLLECTION);

async function  addPersona(req, res)
{    
    const cuerpo = req.body;
    
    logger.debug("En addPersona: ");
    try {
      
      //const persona= await db.collection(COLLECTION).insertOne({name: cuerpo.name,surname: cuerpo.surname    });
      const result= await collection.insertOne(cuerpo);   
      res.status(201).send(cuerpo);
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
async function getPersonaById(req,res)
{  
  logger.debug("En getPersonaById");
  const condiciones={ _id: new mongo.ObjectId(req.params.id)}
  try {
    result = await collection.findOne(condiciones);  
    if (result)  
      res.status(200).send(result);
    else
      res.status(404).send("Not found id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at getPersonaById: "+ex.message);
  }
}

/*
* Update Persona 
* Modifica una persona buscado por parametro id
* En el body se pondran los campos a modificar.
* Ejemplo: PUT  localhost:3000/persona/611a7c26be8e095b49aaf46f
*/
async function updatePersona(req,res)
{  
  logger.debug("En updatePersona");
  try {
    const condiciones={ _id: new mongo.ObjectId(req.params.id)}
    const newRegistry= { $set: req.body}
 
    result = await collection.updateOne(condiciones,newRegistry);  
    if (result.matchedCount==1)  
    {
      result.registry=req.body;
      result.registry._id =  req.params.id;            
      res.status(200).send(result);
    }
    else
      res.status(404).send("Not found id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at updatePersona: "+ex.message);
  }
}
/*
* Borrar una persona por el ID mandado
*/
async function deletePersona(req,res)
{  
  logger.debug("En deletePersona");
  try {
    const condiciones={ _id: new mongo.ObjectId(req.params.id)}
    
 
    result = await collection.deleteOne(condiciones);  
    if (result.deletedCount==1)  
      res.status(200).send(`Delete registry with ID: ${req.params.id}`);
    else
      res.status(404).send("Not found id: "+req.params.id);
  } catch (ex)
  {
    res.status(501).send("Error at deletePersona: "+ex.message);
  }
}
/*
* GetPersona.
* En el body se pueden poner los filtros de busqueda.
*/
async function  getPersona(req, res)
{
  try
  {
    let condiciones=req.body;
   
    logger.debug("En getPersona: ");
    const cursorPersonas=await collection.find(condiciones);
    await sleep(5000)
    const personas=await cursorPersonas.toArray();
    
    res.status(201).send(personas);
  } catch (ex)
  {
    res.status(501).send("Error at getPersona: "+ex.message);
  }
}
exports.addControllers= (app) =>
{
  app.route(PATH).post(addPersona);
  app.get(PATH,getPersona);
  app.get(`${PATH}/:id`, getPersonaById)
  app.put(`${PATH}/:id`, updatePersona)
  app.delete(`${PATH}/:id`, deletePersona)
}