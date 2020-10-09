var http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const local = false;
if(!local){
  app.use(express.static(path.join('frontend', 'build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join('terra_rara1', 'build', 'index.html'));
    
  });
} else {
  

}

app.listen(3000);

module.exports = app;



