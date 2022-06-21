const fs = require('fs')
const post = require('../../index')
const config = require('../../config')

module.exports = file = {

    write: (content) => {
        fs.access(config.filepath, (err) => {

            if (err) {
                fs.writeFile(config.filepath, content, (err) => {
                    if (err) return console.log(err)
                    console.log("after writefile")
                })
            } else {
                fs.appendFile(config.filepath, content, (err) => {
                    if (err) return console.log(err)
                    else console.log('Appended')
                })
            }

        })
    }
}
// Close the connection after the final event emitted by the request, after the callback passes
/*  request.on("requestCompleted", function (rowCount, more) {
      /!*connection.close();*!/
  })*/



