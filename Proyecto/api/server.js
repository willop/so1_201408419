var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("public"));

server.listen(5000, function () {
    console.log("Servidor corriendo en http://localhost:5000");
  });

  io.on("connection", function (socket) {
    console.log("Un cliente se ha conectado");
    socket.emit("message");
  });