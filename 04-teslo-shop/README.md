<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API
1. Clonar el proyecto
2. Instalar las dependencias con ```npm install```
3. Clonar el archivo __.env.template__ y renombrarlo a __.env__
4. Establecer las variables de entorno
5. Levantar la base de datos
```
docker compose up -d
```
6. Ejecutar la aplicación en modo desarrollo con ```npm run start:dev```
7. Ejecutar Seed para la carga inicial de datos
```
http://localhost:3000/api/seed
```