# Nexts.js OpenJira App
Para correr localmente, se necesita la base de datos, ejecute el siguiente comando
```
docker-compose up -d 
```

* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__


# Reconstruir los modulos de node y levantar Nextjs
```
yarn install
yarn dev
```

## Llenar la base de datos con informacion de pruebas
Llamará:
```
http://localhost:3000/api/seed
```
