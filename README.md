# so1_201408419

## Wilfred Stewart Perez Solorzano
## 201408419

# --

* Para construir la imagen del frontend

sudo docker build -t willop/p1_frontend_201408419:latest .

* Para construir la imagen del backend

sudo docker build -t willop/p1_backend_201408419:latest .

* Para construir la imagen de la bash

sudo docker build -t willop/p1_bash_201408419:latest .

## Docker-compose

* Para hacer build el docker-compose

sudo docker-compose build

* Para hacer levantar docker-compose

sudo docker-compose up


* Para bajar todo el docker-compose

sudo docker-compose down

## Para copiar el archivo local al contenedor

sudo docker cp /home/willop/Escritorio/script.txt p1_bash:./
