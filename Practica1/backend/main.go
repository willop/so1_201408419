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
	"time"

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

//return de logs
type Log struct {
	Id        string `json:"Id"`
	Numero1   int    `json:"Numero1"`
	Numero2   int    `json:"Numero2"`
	Operador  string `json:"Operador"`
	Resultado string `json:"Resultado"`
	Fecha     string `json:"Fecha"`
}

//env.Load("./config.env")
//env.Load("config.env")
//env.Load("./config.env")

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
	//enableCors(&w)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")

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
	case "X":
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

	t := time.Now()
	fecha := fmt.Sprintf("%d-%02d-%02d %02d:%02d:%02d",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())

	db, err := getDB()
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	insert, err := db.Query("INSERT INTO Datos(numero1,numero2,operador,resultado,fecha) VALUES (?,?,?,?,?)", info.Numero1, info.Numero2, info.Operador, num, fecha)
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
	fmt.Println("Valores insertados")

	result := Resultado{
		Resultado: num,
	}
	json.NewEncoder(w).Encode(result)
}

func GetData(w http.ResponseWriter, r *http.Request) {
	// display the documents retrieved
	fmt.Println("displaying all results in a collection")

	db, err := getDB()
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	results, err := db.Query("select * from Datos")
	if err != nil {
		panic(err.Error())
	}

	defer results.Close()
	var log Log
	var logs []Log

	for results.Next() {
		err = results.Scan(&log.Id, &log.Numero1, &log.Numero2, &log.Operador, &log.Resultado, &log.Fecha)
		if err != nil {
			panic(err.Error())
		}
		logs = append(logs, log)
	}
	json.NewEncoder(w).Encode(logs)

}
