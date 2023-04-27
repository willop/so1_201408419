const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("configuracion.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.confproto;
const conn = require('./database/conection.js');
require('dotenv').config()


const server = new grpc.Server();
server.bind(process.env.CLIENT_HOST+":40000", grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.getInfo.service, 
    {
        "returnInfo": returnInfo
    });
server.start();

function returnInfo(call, callback){
    var sql = "insert into temporal(Sede, Departamento, Municipio, Paleta, Partido,Fuente) values (\""+call.request.sede+"\",\""+call.request.departamento+"\",\""+call.request.municipio+"\",\""+call.request.paleta+"\",\""+call.request.partido+"\",\"MySQL\");";
          conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          })
    callback(null, {"info":"1 record inserted"});
}



