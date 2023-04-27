const express = require("express");
const app = express();
const util = require('util');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const conn = require('./database/conection.js');
const redis = require('redis');
require('dotenv').config()

const port = process.env.PORT || 5000;
const index = require("./routes/index");
var resultado;
var resultado2;
var resultado3;
var resultado4;
var resultado5;

app.use(cors());
app.use(index);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  setInterval(function () {
    console.log("while, id: " + socket.id);
    
    var query = util.promisify(conn.query).bind(conn);
    (async () => {
      try {
        const rows = await query('select * from temporal;');
        //console.log("rows:\n"+rows);
        resultado = JSON.stringify(rows);
      } finally {
        //conn.end();
      }
    })()
    socket.emit("receive_message", resultado);

    query = util.promisify(conn.query).bind(conn);
    (async () => {
      try {
        const rows = await query('Select Departamento, count(id) as votos from temporal where temporal.Paleta = "Blanca" group by Departamento limit 3;');
        //console.log("rows:\n"+rows);
        resultado2 = JSON.stringify(rows);
        socket.emit("reporte2", resultado2);
      } finally {
        //conn.end();
      }
    })()
    


    query = util.promisify(conn.query).bind(conn);
    (async () => {
      try {
        const rows = await query('Select Departamento, count(id) as votos from temporal group by Departamento;');
        //console.log("rows:\n"+rows);
        resultado3 = JSON.stringify(rows);

    socket.emit("reporte3", resultado3);
      } finally {
        //conn.end();
      }
    })()

    query = util.promisify(conn.query).bind(conn);
    (async () => {
      try {
        const rows = await query('select Sede, count(id) as votos, Fuente  from temporal where Fuente="Redis" group by Sede,Fuente order by votos  desc limit 5 ;');
        //console.log("rows:\n"+rows);
        resultado4 = JSON.stringify(rows);
        socket.emit("reporte4", resultado4);
      } finally {
        //conn.end();
      }
    })()

    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    socket.emit("fecha", now);
    


    var arrreglo = [];
    (async () => {
      try {
        redisClient = redis.createClient({
          host: process.env.DB_HOST_REDIS,
          port: '6379'
        });
        redisClient.on("error", (error) => console.error(`Error : ${error}`));
        redisClient.connect();
        var result = await redisClient.keys("*");
        resultado5 = JSON.stringify(result);
        //console.log(resultado5);
        resultado5 = JSON.parse(resultado5);
        
        for (let index = 0; index < 5; index++) {
          
          var restemp =await redisClient.get(resultado5[index]);
          //console.log("for: "+restemp)
          arrreglo.push(JSON.parse(restemp));
        }
        //console.log(arrreglo)
        socket.emit("reporte5", arrreglo);
      } finally {
        //conn.end();
      }
    })()
  }, 1000);
  
});






server.listen(port, () => {
  console.log("SERVER IS RUNNING ON :"+port);
});

