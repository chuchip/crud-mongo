Aplicacion CRUD con MongoDB realizada en Node 14.

Se utiliza la libreria mongodb  (nativa) y express con CORS.

#### Configuración

Crear fichero `.env` con las siguientes variables.

DB_USER=<USUARIO DATABASE>

DB_PASS=<CONTRASEÑA DE USUARIO>


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

> curl --location --request GET 'localhost:3000/persona' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Victor"
}'

#### Buscar por ID

curl --location --request GET 'localhost:3000/persona/611a7c26be8e095b49aaf46f' 

#### Update por ID

curl --location --request PUT 'localhost:3000/persona/611a8ba946c4deee38e9d096' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Pedro",
    "age": 23
}'

#### Delete por ID.

curl --location --request DELETE 'localhost:3000/persona/611a891852d22c8c274d409d'