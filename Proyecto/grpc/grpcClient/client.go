package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	pb "clientgrpc/proto-grpc"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv" //go get github.com/joho/godotenv
	"google.golang.org/grpc"
)

var _ = godotenv.Load(".env")
var address = os.Getenv("addresserver")

func conectar_server(wri http.ResponseWriter, req *http.Request) {
	// agregando cors
	wri.Header().Set("Access-Control-Allow-Origin", "*")
	wri.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	wri.Header().Set("Content-Type", "application/json")

	//metodo de get
	if req.Method == "GET" {
		wri.WriteHeader(http.StatusOK)
		wri.Write([]byte("{\"mensaje\": \"ok\"}"))
		return
	}

	//leer los datos del body y conectar con grpc

	datos, _ := ioutil.ReadAll(req.Body)

	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		json.NewEncoder(wri).Encode("Error, no se puede conectar con el servidor grpc")
		log.Fatalf("No se puede conectar con el server: (%v)", err)
	}

	defer conn.Close()

	cl := pb.NewGetInfoClient(conn)

	id := string(datos)
	if len(os.Args) > 1 {
		id = os.Args[1]
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()

	ret, err := cl.ReturnInfo(ctx, &pb.RequestID{Id: id})
	if err != nil {
		json.NewEncoder(wri).Encode("Error, no  se puede retornar la información.")
		log.Fatalf("No se puede retornar la información returninfo: (%v)", err)
	}

	log.Printf("Respuesta del server: %s\n", ret.GetInfo())
	json.NewEncoder(wri).Encode("Se ha almacenado la información")
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", conectar_server)
	fmt.Println("Cliente ejecutandose en el puerto 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
