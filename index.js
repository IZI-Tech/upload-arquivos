const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000
process.env['TOKEN'] = 'ABC123456'

app.use(express.urlencoded({ extended: true })); 

app.post('/upload', (req, res) => {
  req.setEncoding('utf8');
  if ( process.env['token'] == req.body.token ) {
    fs.writeFile(
        req.body.path, 
        req.body.arquivo, 
        function(error) {
          if (error) {
            console.log(error);
          } else {
            console.log("The file was saved!");
          }
        }
      ); 
  } else {
    res.sendStatus(403);
  }
  res.sendStatus(200);
})

app.get('/live', function(req, res) {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Escutando uploads em http://localhost:${port}`)
})