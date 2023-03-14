package main

import (
	"fmt"
	"os"
	"os/exec"
	"time"

	//variables de entorno
	"github.com/joho/godotenv" //go get github.com/joho/godotenv
	//base de datos
	"database/sql"

	_ "github.com/go-sql-driver/mysql" //go get github.com/go-sql-driver/mysql
)

func getModuloRAM() string {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	//fmt.Println(json)
	return json

}

func getModuloCPU() string {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201408419")
	salida, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println(err)
	}
	json := string(salida[:])
	fmt.Println("**********************\nJson obtenido del proc\n*********************\n")
	//fmt.Println(json)
	return json

}

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
	db, err := sql.Open("mysql", ConnectionString)
	if err != nil {
		return nil
	}
	return db
}

func main() {
	fmt.Println("Iniciando servidor GO")

	for true {
		query := `INSERT INTO Info_ram(Ram_json) VALUES (?);`
		result, err := conn.Exec(query, getModuloRAM())

		if err != nil {
			fmt.Println("Error en insert RAM")
			fmt.Println(err)
		}
		fmt.Println("Insertado mysql RAM")
		fmt.Println(result)

		query = `INSERT INTO Info_cpu(CPU_json) VALUES (?);`
		result, err = conn.Exec(query, getModuloCPU())

		if err != nil {
			fmt.Println("Error en insert CPU")
			fmt.Println(err)
		}
		fmt.Println("Insertado mysql CPU")
		fmt.Println(result)

		time.Sleep(5 * time.Second)
	}
}
