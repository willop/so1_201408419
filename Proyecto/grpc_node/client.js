var express = require('express')
const cors = require('cors');
require('dotenv').config();
const bp = require('body-parser')

var app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors());
app.use('/gRPC', require('./routes/route.js'));

app.listen(4000, function(){
    console.log('Server run on port 4000');
});


/*
*/