const dbconnection = require('../../connection/dbconnection')
const express = require('express')
const app = express()

module.exports= display = app.get('/show', (req,res)=>
{
    let request = new connection.Request()
    request.query ('Select * from SiteData',(err,result)=>{
        if (err)
            console.log(err)
        else
            res.send(result)
    })

})

