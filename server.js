const express = require('express');
var fs = require("fs");
const app = express()
app.use(express.json())
const port = 3000

app.get('/', (req, res) => {
   res.send('Hello World!')
})

app.get('/listUsers', (req, res) => {
   fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
      if (err) {
         return console.log(err);
      }

      console.log(data);
      res.end(data);
   });
})

app.post('/addUser', function (req, res) {
   fs.readFileSync(__dirname + "/" + "user.json", 'utf8', function (err, data) {
      if (err) {
         return console.log(err);
      }

   var data = data.concat(JSON.stringify(req.body))

   console.log(data)

   res.end( data );

   // fs.writeFileSync(__dirname + "/" + "user.json", `${data}`), function(err){
   //    if(err){
   //       return console.log(err)
   //    }
   // }

   });
})

app.post('/addUserTest', (req, res) => {
   console.log(req.body)

   res.end("Yep");
})

app.listen(port, () => {
   console.log(`Listening on ${port}`)
})