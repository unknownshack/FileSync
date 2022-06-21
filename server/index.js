let Request = require('tedious').Request
let TYPES = require('tedious').TYPES;
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config')
const dbconnection = require('./connection/dbconnection')
const file = require('./modules/Post/file_write')
const display = require('./modules/Insertion/display')

app.use(cors()) //for cors policy error
app.use(express.json()) //for catching the values thrown from front-end

let connection = dbconnection.connect();
console.log("before insertionroutes")
//==========================================POST REQUEST START==================================================
//will be triggered when '/create' is used in url like "https://3001/create"
module.exports = post = {
    body: app.post("/create", (req, res) => {

        console.log("Here")

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

        request.on('row', (columns) => {

            columns.forEach((column) => {
                if (column.value == NULL)
                    console.log("NULL")
                else console.log(column.value + "is inserted")
            })
        })
        console.log("After request on")
        connection.execSql(request);
        let content = ip + " " + site + "\r\n"

    })
}
//============================================POST REQUEST CLOSED============================================

//=====================================GET REQUEST=====================================================

app.get('/show', (req,res)=>
{
    let request = new Request('Select * from SiteData', (err)=>{
        if (err)
            console.log(err)

})
    let result = [];
    request.on('row', (columns)=> {
        entry= {}
        columns.forEach((column)=> {
            if (column.value === null) {
                console.log('NULL');
            }

            else {

                entry[column.metadata.colName] = column.value

            }


        })
        result.push(entry)
    });
    request.on('requestCompleted',(rowCount,more)=>{
        res.send(result)
    })

    connection.execSql(request);
})

//=========================================GET REQUEST END==============================================

//=========================================PUT REQUEST=================================================

app.put('update',(req,res)=>{

    const ip = req.body.ip
    const site = req.body.site
    const id = req.body.id

    let request = new Request("UPDATE SiteData SET ip, site value ?,? where id = ?",(err,result)=>{
        if (err)
            console.log(err)
        else
            res.send(result)
    })
    request.addParameter('ip', TYPES.VarChar, ip);
    request.addParameter('site', TYPES.VarChar, site)
    request.addParameter('id',TYPES.Int, id)

    connection.execSql(request)
})
//=========================================LISTENING PORT FOR BACKEND========================================
app.listen(3001, () => {
    console.log("This port is listening")
})
//===========================================================================================================