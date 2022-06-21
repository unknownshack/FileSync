const config = require('../config')
let Connection = require('tedious').Connection;


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

module.exports = dbconnection = {
    connect: () => {
        let connection = new Connection(conf);

        connection.on('connect', (err) => {
            if (err)
                console.log(err)

            else
                console.log("connected")

        });

        connection.connect()

        return connection;
    }
}

