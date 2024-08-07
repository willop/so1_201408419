# Wilfred Stewart Perez Solorzano
# 201408419
# Proyecto 2 


## Descripcion
---
Se debe crear un sistema distribuido que muestre estadísticas en tiempo real mediante Kubernetes y tecnologías en la nube. También se debe proporcionar un despliegue blue/green, es decir, una división de tráfico de entrada. Este proyecto será aplicado para llevar el control sobre el porcentaje de votos emitidos en las elecciones.


## Ejemplo de archivo:
[
    {
        "sede": 1,
        "municipio": "Guatemala",
        "departamento": "Guatemala",
        "papeleta": "Blanca",
        "partido": "FCN"
    },
…
]

## comandos a utilizar

//-------------- FRONTEND --------------
npm install react-bootstrap bootstrap
npm install --save react-google-charts
npm i d3
npm install react-icons --save
npm i socket.io-client
npm install chart.js react-chartjs-2

//---------------LOCUST------------------
Ejecutar
locust -f traffic.py

//---------------- GRPC GO------------------
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
export PATH="$PATH:$(go env GOPATH)/bin"

//Server
sudo apt install protobuf-compiler
go mod init servergrpc
-- crear un archivo configuracion.proto y programarlo


cd proto-grpc
export PATH="$PATH:$(go env GOPATH)/bin"
* protoc --go_out=. --go-grpc_out=. foo.proto
* protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    configuracion.proto
go get github.com/joho/godotenv


//client
Copiar carpeta proto-grpc completa
Ejecutar
go mod init clientgrpc
go get github.com/gorilla/mux
go get google.golang.org/grpc
go get github.com/joho/godotenv

//--------------------------GRPC Node------------------------
npm install -D nodemon
npm i express
npm i cors
npm install dotenv --save
npm install mysql
npm install router
npm i body-parser



--------------------------------- Pub/Sub redis -----------------------
-----Pub---------
go mod init pubredis
go get github.com/gofiber/fiber/v2
go get github.com/go-redis/redis/v8

------Sub --------
go mod init subredis
go get github.com/go-sql-driver/mysql
go get github.com/joho/godotenv


//---------------------------------- Socker.io --------------------
npm install socket.io
npm install express@4

//---------------------------------------API -----------------------
npm install dotenv --save
npm install mysql
npm i redis
npm install -g redis-commander
--ejecutar "redis-commander"
npm i dotenv


//--------------------------------- DOCKER BUILD ----------------------
## contruir imagenes de docker 
sudo docker build -t willop/pf_frontend_201408419:latest .
sudo docker build -t willop/pf_api_201408419:latest .
sudo docker build -t willop/pf_grpc_client_201408419:latest .
sudo docker build -t willop/pf_grpc_server_201408419:latest .
sudo docker build -t willop/pf_redis_sub_201408419:latest .
sudo docker build -t willop/pf_redis_pub_201408419:latest .

//--------------------------------- DOCKER PUSH -----------------------
##
sudo docker push willop/pf_frontend_201408419:latest
sudo docker push willop/pf_api_201408419:latest
sudo docker push willop/pf_grpc_client_201408419:latest
sudo docker push willop/pf_grpc_server_201408419:latest
sudo docker push willop/pf_redis_sub_201408419:latest
sudo docker push willop/pf_redis_pub_201408419:latest