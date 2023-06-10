# Prueba Técnica - Documentación de API
Este proyecto contiene una API para gestionar pizzas utilizando Express, Sequelize y ReactJs

### Requisitos
Node.js (v18 o posterior)
NPM
Docker


### Installing

Clone

```
https://github.com/pr4zka/Test-FullStack-Backend.git

```
## Docker
1. Para ejecutar el proyecto con docker en la raiz del proyecto escribe:

```
docker-compose up --build
```
2. Esto levantara el servidor del cliente y el backend al mismo tiempo
3. La aplicacion Cliente esta disponible en el puerto `http://localhost:5173` y el servidor estara en el puerto `htpp://localhost:3000`
4. Asegurate de haber configurado tu base de datos local


## En caso de no utilizar docker puedes correr el proyecto con estos comandos

Installar dependencias en el Servidor
```
npm install
```

Instalar dependencias en el Cliente
```
cd client
npm instal;
```

## Requisitos previos

1. Asegúrate de tener instalado PostgreSQL en tu sistema.
2. Asegúrate de ajustar los valores de las variables según tu configuración de la base de datos.


## Paso 1: Establecer la conexión a la base de datos

1. Abre el archivo `db.js` ubicado en la carpeta `database`.
2. Reemplaza las siguientes líneas de código con la configuración correspondiente:

```javascript
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;
const dbUser = process.env.DB_USER || 'usuario';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbName = process.env.DB_NAME || 'tu_base_de_datos';

```
## Paso 2: Crear la base de datos

1. Dirigite a tu aplicacion de PostgreSql y crea una nueva base de datos
2. Puedes reemplazar el nombre de la base de datos `test_backend` por el nombre de la base de datos que acabas de crear.
3. Las variables de entorno son de preferencia personal, no hace falta colocarlas.
4. En el archivo principal `app.js` hay una opcion llamada `{force: true}` por  defecto se encuentra asi, si por algun inconveniente necesitas reiniciar el servidor colocalo en `{force: false}` esto se encargara de no volver a ejecutar las migraciones de los modelos.
3. Listo ahora puedes proceder a ejecutar la aplicacion 


## Uso Servidor
1. Ejecuta la aplicación de servidor: `npm start`
2. La aplicacion deberia estar disponible en el puerto: `http://localhost:3000/api`


## Uso Cliente
1. Dirigite a la carpeta `cd client`    
2. Ejecuta el comando `npm run dev`
3. La aplicacion estara disponible en el puerto: `http://localhost:5173`


## Aviso
1. Para crearte un usuario en la Aplicacion Web introduce la siguiente url `http://localhost:5173/register`
2. Una vez creado el usuario te redirigira al login y podras iniciar sesion
3. No olvides tus credenciales
 



## Documentacion de postman
https://documenter.getpostman.com/view/20420359/2s93mBxzXh


## Documentacion de Swagger 
1. Ejecuta el servidor en la ruta raiz `npm start`
2. La documentacion esta en la URL `http://localhost:3000/api-docs`