Aplicacion CRUD con MongoDB realizada en Node 14.

Se utiliza la libreria mongodb  (nativa) y express con CORS.

#### Configuración

Crear fichero `.env` con las siguientes variables.

DB_USER=USUARIO
DB_PASS=CONTRASEÑA

#### Start: 

> npm run dev


#### Insertar registro:

> curl --location --request POST 'localhost:3000/persona' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jesús",
    "surname": "Puente",
    "age": 54,
    "city": "Logroño"
}'


#### Listar todos los registro:

> curl --location --request GET 'localhost:3000/persona'