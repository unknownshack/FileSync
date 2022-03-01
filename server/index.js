let Connection = require('tedious').Connection;
let Request = require('tedious').Request
let TYPES = require('tedious').TYPES;
let fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config')

app.use(cors()) //for cors policy error
app.use(express.json()) //for catching the values thrown from front-end

let conf = {
    server: config.server,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: config.userName, //update
            password: config.password //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: false,
        database: config.database  //update me
    }
};
//For connection to database
let connection = new Connection(conf);

connection.on('connect', (err) => {
    console.log("Connected");
});


//opening a port for api

try {
    console.log("Connected")
    connection.connect();
} catch (err) {
    res.send(err)
}
app.get('/show', (req, res) => {
    console.log("data")
    let request = new Request("Select * from SiteData", (err) => {
        if (err) {
            console.log(err);
        }

    })
    let result = "";
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });


    request.on("requestCompleted", function (rowCount, more) {
        console.log("Disconnected")
        /* connection.close();*/
    });
    connection.execSql(request)


})

//will be triggered when '/create' is used in url like "https://3001/create"
app.post("/create", (req, res) => {
    console.log("Here")
    console.log(req)
    console.log(req.body)
    const ip = req.body.ip
    const site = req.body.site
    console.log("Before request")
    let request = new Request("INSERT into SiteData(ip, site) values (@ip , @site);", (err) => {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('ip', TYPES.VarChar, ip);
    request.addParameter('site', TYPES.VarChar, site);
    console.log("Before writing file")
    console.log(ip)
    fs.writeFile(config.filepath, ip + site, (err) => {
        if (err) return console.log(err)
        console.log('Log inserted')

    });
    console.log("after writefile")

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        console.log("pasa")
        /*connection.close();*/
    })
    console.log("After request on")

    connection.execSql(request);
    res.send('sent')

})


app.listen(3001, () => {
    console.log("This port is listening")
})