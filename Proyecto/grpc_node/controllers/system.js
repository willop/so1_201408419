const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("configuracion.proto",{});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.confproto;

const client = new todoPackage.getInfo(process.env.SERVER_HOST+":40000", grpc.credentials.createInsecure())



const send = async (req, res) => {
    console.log("GetClient");
    console.log(JSON.stringify(req.body))
    client.returnInfo({
        "sede":req.body.sede,
        "departamento":req.body.departamento,
        "municipio":req.body.municipio,
        "paleta":req.body.paleta,
        "partido":req.body.partido
    },(err, response)=>{
        console.log("recieved from server: " + JSON.stringify(response))
    })

    return res.json({
        success: true,
        msj: 'Obtenido en client',
    });  
};

module.exports = {
    send
}