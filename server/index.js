const express = require('express')
const app = express();
/*const mssql = require('mssql')

const connection = mssql.connect({
    host:'localhost',
    user:'groot',
    password:'groot',
    database:'Links'
})

const request = mssql.Request();

request.query('INSERT INTO tLinks(webLinks) VALUES (\'a link\')')*/

/*
app.get('/', (req, res) => {

    let sql = require("mssql");

    // config for your database
    let config = {
        user: 'groot',
        password: 'groot',
        server: 'localhost',
        database: 'Links'
    };

    // connect to your database
    sql.connect(config, (err)=> {

        if (err) console.log(err);

        // create Request object
        let request = new sql.Request();

        // query to the database and get the records
        request.query("INSERT INTO tLinks(webLinks) VALUES ('a link')", (er, recordset)=> {

            if (er) console.log(er)

            // send records as a response
            res.send(recordset);

        });
    });
});
*/



const mssql = require('tedious').Connection;

const db = {
    server: 'localhost',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'groot', //update me
            password: 'groot'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'Links'  //update me
    }

}

const connection = new mssql(db)

connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
});

let Request = require('tedious').Request;
let TYPES = require('tedious').TYPES;

function executeStatement() {
    let request = new Request("SELECT C;", (err) =>{
        if (err) {
            console.log(err);}
    });
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result+= column.value + " ";
            }
        });
        console.log(result);
        result ="";
    });

    request.on('done', (rowCount, more)=> {
        console.log(rowCount + ' rows returned');
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", (rowCount, more)=> {
        connection.close();
    });
    connection.execSql(request);
}


connection.connect();

/*db.query("INSERT INTO tLinks(webLinks) VALUES ('a LINK')", function (err, recordset) {

    if (err) console.log(err)

    // send records as a response
    res.send(recordset);

});*/
app.listen(3001, ()=> {
    console.log('Server is running..');
});