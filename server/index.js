const express = require('express')
const app = express();

var Connection = require('tedious').Connection;
var config = {
    server: 'your_server.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //update me
            password: 'your_password'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'your_database'  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
    executeStatement1();
});

connection.connect();

var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

function executeStatement1() {
    request = new Request("INSERT into SiteData(IP address, site ) values (@ip , @site));", function(err) {
        if (err) {
            console.log(err);}
    });
    request.addParameter('ip', TYPES.NVarChar,'SQL Server Express 2014');
    request.addParameter('site', TYPES.NVarChar , 'SQLEXPRESS2014');

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Product id of inserted item is " + column.value);
            }
        });
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);
}