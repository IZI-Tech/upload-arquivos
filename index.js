const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000
const path = require('path');
process.env['token'] = 'ABC123456'

app.use(express.urlencoded({ extended: true })); 

app.post('/upload', (req, res) => {
  
  
  req.setEncoding('utf8');
  if ( process.env['token'] == req.body.token ) {
    if ( !req.body.path ) {
      res.status(400).send('Path não informado. (path)');  
    }
    if ( !fs.existsSync(req.body.path) ) {
      res.status(400).send('O path informado não é válido: '+req.body.path);  
    }
    if ( !req.body.nome_arquivo ) {
      res.status(400).send('Nome do arquivo não informado. (nome_arquivo)');  
    }
    if ( !req.body.arquivo ) {
      res.status(400).send('Arquivo não informado. (arquivo)');  
    }
    
    var obj = { dir: req.body.path, base: req.body.nome_arquivo }
    var path_absoluto = path.format(obj);

    fs.writeFile(
        path_absoluto, 
        req.body.arquivo, 
        (error) => {
            if (error) {
              console.error(error);
              res.status(400).send(error);
            } else {
              console.log('Arquivo salvo: '+path_absoluto);
              res.status(200).send('Arquivo salvo: '+path_absoluto);
            }
          }
        ); 
  } else {
    res.status(403).send('Token inválido');
  }
})

app.get('/live', function(req, res) {
  res.send('Serviço de recebimento de arquivo no ar!');
});

app.listen(port, () => {
  console.log(`Escutando uploads em http://localhost:${port}`)
})