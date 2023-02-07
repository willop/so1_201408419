package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

	/*
		"encoding/json"
			"context"
			"io/ioutil"
			"log"
		    "net/http"
		    "os"
			"reflect"
			"time"

	*/
	"github.com/gorilla/handlers" //go get -u github.com/gorilla/handlers
	"github.com/gorilla/mux"      //go get -u github.com/gorilla/mux*/
	"github.com/joho/godotenv"    //go get github.com/joho/godotenv

	//base de datos
	_ "github.com/go-sql-driver/mysql" //go get github.com/go-sql-driver/mysql
)

//LOS ATRIBUTOS VAN EN MAYUSCULA

//getdatos
type Returnn struct {
	Numero1  int    `json:numero1` // `esto es para permitir en minusculas`
	Numero2  int    `json:numero2`
	Operador string `json:operador`
}

//setresultado
type Resultado struct {
	Resultado string `json:"resultado"`
}

func getDB() (*sql.DB, error) {
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
		return nil, err
	}
	return db, nil
}

func main() {
	fmt.Println("Servidor de GO execute \nPort:4000\n...")
	//-------------------------------Inicio del servidor------------------
	router := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Autorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})
	http.Handle("/", router)

	//---------------------NOTA NO DIRECCIONES CON HIJOS --------------------------
	//------------------------------- RUTAS --------------------------------------
	router.HandleFunc("/logs", GetData).Methods("GET")
	router.HandleFunc("/resolver", SetData).Methods("POST")
	//router.HandleFunc("/modificarauto", ModificarAuto).Methods("POST")
	//router.HandleFunc("/deletecar", DeleteCarr).Methods("POST")
	//router.HandleFunc("/filter", Filterfunc).Methods("POST")

	//------------------------------ servidor ------------------------------------
	log.Fatal(http.ListenAndServe(":4000", handlers.CORS(headers, methods, origins)(router)))
}

func SetData(w http.ResponseWriter, r *http.Request) {
	var info Returnn
	reqBody, _ := ioutil.ReadAll(r.Body)
	err := json.Unmarshal(reqBody, &info)
	if err != nil {
		fmt.Println(err)
	}

	var num string
	switch info.Operador {
	case "+":
		num = strconv.Itoa(info.Numero1 + info.Numero2)
		break
	case "-":
		num = strconv.Itoa(info.Numero1 - info.Numero2)
		break
	case "*":
		num = strconv.Itoa(info.Numero1 * info.Numero2)
		break
	case "/":
		if info.Numero2 != 0 {
			num = strconv.Itoa(info.Numero1 / info.Numero2)
		} else {
			num = "ERROR"
		}
		break
	}

	result := Resultado{
		Resultado: num,
	}
	json.NewEncoder(w).Encode(result)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	// display the documents retrieved
	fmt.Println("displaying all results in a collection")

	//json.NewEncoder(w).Encode(rest)
}
