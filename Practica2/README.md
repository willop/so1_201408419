# Sistemas operativos 1

## Wilfred Stewart Perez Solorzano
## 201408419

## Practica 2

</br>

# Descripcion
Se deberá implementar un dashboard simple para obtener información sobre la memoria RAM y CPU del sistema haciendo uso de módulos del kernel escritos en C para obtener la información y escribirla en archivos dentro de la carpeta /proc para posteriormente leerlos con Golang. Estos datos leídos deberán ser almacenados en una base de datos MySQL para luego ser obtenidos por una API desarrollada en NodeJS. El estudiante deberá utilizar React para realizar la interfaz gráfica que permita ser visualizada a través del navegador. Por último, se le solicita hacer uso de máquinas virtuales de Google Cloud, así como también utilizar CloudSQL para la base de datos.
</br>

# Modulos a implementar
## Módulo de Memoria RAM (sysinfo)
El módulo deberá sobrescribir un archivo en el directorio /proc.
Características por implementar:
* Importar librería <sys/sysinfo.h>
* Debe imprimir el número de carnet al cargar el módulo (insmod).
* Debe imprimir el nombre del curso al descargar el módulo (rmmod).
* La información que se mostrará en el módulo debe ser obtenida por medio
de los struct de información del sistema operativo y no de la lectura de otro
archivo o comandos de consola.
* El nombre del módulo será: ram_<<carnet>>
## Módulo CPU (task_struct)
El módulo deberá sobrescribir un archivo en el directorio /proc.
Características por implementar:
* Importar librerías: <linux/sched.h>, <linux/sched/signal.h>
* Debe imprimir el nombre del estudiante al cargar el módulo (insmod).
* Debe imprimir “Primer Semestre 2023” al descargar el módulo (rmmod).
* La información por mostrar debe ser obtenida por medio de los struct de
datos del sistema operativo y no de la lectura de archivos o comandos de
consola.
* El nombre del módulo será: cpu_<< carnet >>
</br>

# APLICACIÓN WEB
La aplicación web permite visualizar gráficas dinámicas que muestren:
* Uso del CPU.
* Uso de la memoria RAM del servidor.
* La aplicación web permite mostrar la información básica de los procesos que se ejecutan y de sus hijos si tuviesen.

# Dependencias
## FRONTEND
npx create-react-app frontend
//progress bar
npm install --save react-circular-progressbar
npm install dotenv --save
npm i axios

---
## Backend GO 

Para go.mod 
-   go mod init main.go
Para go.sum 
-   go tity

---
## Server Node js
npm init -y
npm install -D nodemon
npm i express
npm i cors
npm install dotenv --save
npm install mysql
npm install router

# Flujo de la aplicacion

Crear los archivos de cpu y ram
```
    make all
```

para cargar los modulos a los procesos de la maquina anfitrion
- sudo insmod cpu_201408419.ko
- sudo insmod ram_201408419.ko

Ejecutar el backend de go
- go run main.go
<br/>
        <center> ### Recordar que tiene un .env ### </center>



# Docker
## Construir imagen de backen nodejs 
sudo docker build -t willop/p2_backend_201408419:latest .
sudo docker build -t willop/p2_frontend_201408419:latest .

# Docker-compose 
* sudo docker-compose build
* sudo docker-compose up
* sudo docker-compose down

* sudo docker build -t willop/p2_backendgo_201408419:latest .
* sudo docker run -e user=$user -e pass=$pass -e host=$host -e port=$port -e db_name=$db_name --name backendgo -it willop/p2_backendgo_201408419:funcional


sudo docker run -e user=root -e pass=root -e host=00.00.00.00 -e port=3306 -e db_name=Practica2 --name backendgo -it willop/p2_backendgo_201408419:latest


---
# Dependencias maquinas virtuales 

## Modulos
sudo apt install make

## gcc
* sudo apt update
* sudo apt install build-essential
* sudo apt-get install manpages-dev
* gcc --version

## docker
* Link:https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-es

* sudo apt update
* sudo apt install apt-transport-https ca-certificates 
* curl software-properties-common
* curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
* sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
* sudo apt update
* apt-cache policy docker-ce
* sudo apt install docker-ce




## Aplicacion
* sudo apt update
* docker
* docker-compose
* sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
* sudo chmod +x /usr/local/bin/docker-compose
* docker-compose --version

