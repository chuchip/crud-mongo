'use strict';
// Inicializa Express
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const port = 3000

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

require('dotenv').config();

const logger = require('./logger').logger

logger.info("Comienza la aplicacion")
const db = require('./database').db;


const personaController = require('./persona.controller')
personaController.addControllers(app);

var corsOptions = {
    origin: "http://localhost:4200"
  };
  
app.use(cors(corsOptions));
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})




//init().catch(console.error);
