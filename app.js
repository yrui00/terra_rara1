var http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const local = true;
if(!local){
  app.use(express.static(path.join('frontend', 'build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join('terra_rara1', 'build', 'index.html'));
    
  });
} else {
  
  const indexRoute = require('./routes/listimages');

  app.use('/listimages', indexRoute);
  
}

app.listen(3000);

module.exports = app;

