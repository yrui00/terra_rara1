/*var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('App Node funcionando!\n');
}).listen(process.env.PORT_APP);
console.log('Server running at :'+process.env.PORT_APP);*/
//process.env.PORT_APP = 3000;
const express = require('express');
const path = require('path');
const app = express();
const imageList = require('./backend/data_imagens.js');

app.get('/api/jsonimgs', (req, res) => {
  res.send(imageList);
})


app.get('/', (req, res) => {
  //res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
  res.end('HELLO')
});

app.listen(process.env.PORT_APP);
module.exports = app;