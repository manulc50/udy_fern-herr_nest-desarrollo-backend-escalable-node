<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrarlo a __.env__
6. Llenar las variables de entorno definidas en el archivo ```.env```
7. Ejecutar la aplicación en modo dev
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla
```
POST -> http://localhost:3000/api/v2/seed
```

# Build de Producción
1. Crear el archivo ```.env.prod```
2. Establecer las varibles de entorno de Producción
3. Crear y ejecutar los contenedores
* Forzando la creación de la imagen
```
docker compose -f .\docker-compose-prod.yml --env-file .env.prod up -d --build
```
* Sin forzar la creación de la imagen
```
docker compose -f .\docker-compose-prod.yml --env-file .env.prod up -d --build
```

## Stack usado
* MongoDB
* Docker
* Nest
