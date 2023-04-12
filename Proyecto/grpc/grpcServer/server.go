package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	"os"
	pb "servergrpc/proto-grpc"

	"github.com/joho/godotenv"
	"google.golang.org/grpc"
)

const port = ":50051"

type comentario struct {
	Sede         string `json:"sede"`
	Departamento string `json:"departamento"`
	Municipio    string `json:"municipio"`
	Paleta       string `json:"paleta"`
	Partido      string `json:"partido"`
}

type server struct {
	pb.UnimplementedGetInfoServer
}

func almacenarComentario(comentario string) {
	//ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	//defer cancel()

	//var bdoc interface{}

	fmt.Println("Antes de insertar a db")
	//errb := bson.UnmarshalExtJson([]byte(comentario, true, &bdoc))
	fmt.Println(comentario)

	//insertamos
}

/*
	concexion para la base de datos de MySQL
*/

var conn = getDB()

//Metodo para obtener la conexion a la base de datos
func getDB() *sql.DB {
	var _ = godotenv.Load(".env")
	var (
		ConnectionString = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
			os.Getenv("user"),
			os.Getenv("pass"),
			os.Getenv("host"),
			os.Getenv("port"),
			os.Getenv("db_name"))
	)
	db, err := sql.Open("mysql:", ConnectionString)
	if err != nil {
		return nil
	}
	return db
}

func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestID) (*pb.ReplyInfo, error) {
	almacenarComentario(in.GetId())
	fmt.Println(">> Emos recibido la data del cliente: %v <<", in.GetId())
	return &pb.ReplyInfo{Info: ">> Hola cliente, he recibido el comentario: " + in.GetId()}, nil
}

func main() {

	listener, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Fallo al levantar el server: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})
	if err := s.Serve(listener); err != nil {
		log.Fatalf("2.0 Fallo al levantar el server: %v", err)
	}
}
