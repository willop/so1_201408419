const conn = require('../database/conection.js');

function todo (){
    console.log("Select all")
    conn.query('select * from temporal;',
        function (err, result, fields) {
            if (err) console.log(err);
            //console.log(result[0].CPU_json)
            return json(JSON.parse(result[0].sede))
        }
    );
};

module.exports = {
  todo
};