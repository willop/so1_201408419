package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv" //go get github.com/joho/godotenv

	_ "github.com/go-sql-driver/mysql" //go get github.com/go-sql-driver/mysql
)

var conn = getDB()

//Metodo para obtener la conexion a la base de datos
func getDB() *sql.DB {
	var _ = godotenv.Load(".env")
	var (
		ConnectionString = fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
			os.Getenv("user"),
			os.Getenv("pass"),
			os.Getenv("host_mysql"),
			os.Getenv("port_mysql"),
			os.Getenv("db_name"))
	)
	db, err := sql.Open("mysql", ConnectionString)
	if err != nil {
		return nil
	}
	return db
}

type User struct {
	Sede         int    `json:"sede"`
	Departamento string `json:"departamento"`
	Municipio    string `json:"municipio"`
	Paleta       string `json:"paleta"`
	Partido      string `json:"partido"`
}

var ctx = context.Background()

var redisClient = redis.NewClient(&redis.Options{
	Addr: os.Getenv("host") + ":" + os.Getenv("port"),
})

func main() {
	subscriber := redisClient.Subscribe(ctx, "send-user-data")
	//subscriber := redisClient.Subscribe(ctx, "keydata")

	user := User{}

	for {
		msg, err := subscriber.ReceiveMessage(ctx)
		if err != nil {
			panic(err)
		}

		if err := json.Unmarshal([]byte(msg.Payload), &user); err != nil {
			panic(err)
		}

		fmt.Println("Received message from " + msg.Channel + " channel.")

		query := `INSERT INTO temporal(sede,Departamento,Municipio, Paleta, Partido,Fuente) VALUES (?,?,?,?,?,?);`
		result, err := conn.Exec(query, user.Sede, user.Departamento, user.Municipio, user.Paleta, user.Partido, "Redis")

		if err != nil {
			fmt.Println("Error en insert temporal redis/sub")
			fmt.Println(err)
		}
		fmt.Println("Insertado mysql redis/sub")
		fmt.Println(result)

	}
}
