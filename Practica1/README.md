# Sistemas operativos 1

## Wilfred Stewart Perez Solorzano
## 201408419

</br>
</br>

# OBJETIVOS
* Comprender cómo funcionan los contenedores.
* Practicar comandos de Docker.
* Implementar Docker-Compose.
* Generar persistencia de datos mediante Docker Volume.
* Utilizar Docker Hub.
* Desarrollar scripts usando comandos de bash.

# FRONTEND:
Se solicita al estudiante que realice aplicación desarrollada en React, dicha aplicación
será una calculadora sencilla, la cual contará con 4 operaciones matemáticas:
* Suma
* Resta
* Multiplicación
* División

# BACKEND
Las operaciones entre los números deben realizarse del lado del servidor por lo que se le solicita al estudiante realizar un servidor desarrollado en el lenguaje Go.
# DATA BASE
Se solicita al estudiante utilizar MySQL como base de datos para llevar un log de las operaciones realizadas, por cada operación realizada se deberá almacenar los valores que se quieren operar, el tipo de operación y el resultado, la fecha y hora en que se realizó la operación.


# REPORTES
Se solicita que el estudiante realice una serie de reportes que se describen más adelante. Para ello se debe implementar un script en bash, por lo que no se permite realizar estos reportes con algún lenguaje de programación. Se debe generar un archivo con todos los logs realizados para que posteriormente el script lo lea. Se deben presentar los siguientes reportes:
* Cantidad total de logs registrados.
* Cantidad total de operaciones que resultaron en error.
* Cantidad de operaciones por separado, es decir, número de sumas, restas,
multiplicaciones y divisiones.
* Mostrar los logs del día de hoy.

# Configuracion Docker

## Imagenes Docker

* Para construir la imagen del frontend

```
sudo docker build -t willop/p1_frontend_201408419:latest .
```

* Para construir la imagen del backend

```
sudo docker build -t willop/p1_backend_201408419:latest .
```


* Para construir la imagen de la bash
```
sudo docker build -t willop/p1_bash_201408419:latest .
```

</br>
</br>

## Docker-compose

* Para hacer build el docker-compose

```
sudo docker-compose build
```

* Para hacer levantar docker-compose

```
sudo docker-compose up
```


* Para bajar todo el docker-compose

```
sudo docker-compose down
```

</br>
</br>

## Para copiar el archivo local al contenedor
```
sudo docker cp /home/willop/Escritorio/script.txt p1_bash:./
```

