var http = require('http');
const express = require('express');
const app = express();

const indexRoute = require('./frontend/src/App.js');
app.use('/', indexRoute);

app.listen(3000);

module.exports = app;
//app.listen(process.env.PORT_TERRA_RARA1_APP);