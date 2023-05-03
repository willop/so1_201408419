package main

import (
	"context"
	"encoding/json"
	"fmt"

	"os"
	"strconv"

	"github.com/joho/godotenv" //go get github.com/joho/godotenv

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

type User struct {
	Sede         int    `json:"sede"`
	Departamento string `json:"departamento"`
	Municipio    string `json:"municipio"`
	Paleta       string `json:"paleta"`
	Partido      string `json:"partido"`
}

var ctx = context.Background()
var _ = godotenv.Load(".env")

var redisClient = redis.NewClient(&redis.Options{
	Addr: os.Getenv("host") + ":" + os.Getenv("port"),
})

func main() {
	app := fiber.New()
	var index = 0
	fmt.Println("Server Pub running on port 8000")
	fmt.Println("Host: http://" + os.Getenv("host") + ":" + os.Getenv("port"))
	app.Post("/", func(c *fiber.Ctx) error {
		user := new(User)

		if err := c.BodyParser(user); err != nil {
			panic(err)
		}

		payload, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}

		if err := redisClient.Publish(ctx, "send-user-data", payload).Err(); err != nil {
			panic(err)
			fmt.Println("Error en rediscli")
		}
		nombrekey := "keydata-"
		concat := nombrekey + strconv.Itoa(index)
		if err := redisClient.Set(ctx, concat, payload, 0).Err(); err != nil {
			panic(err)
			fmt.Println("Error al enviar data")
		}
		fmt.Println("antes del return status 200")
		index++

		return c.SendStatus(200)
	})

	app.Listen(":8000")
}
