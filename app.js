process.env.PORT_APP = 5000;
const express = require('express');
const path = require('path');
const app = express();
const imageList = require('./backend/data_imagens.js');
const bodyParser = require('body-parser');
const Media = require('./backend/routes/resize');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(express.static(path.join('frontend','build')));

app.get('/api/jsonimgs', (req, res) => {
  res.send(imageList);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/frontend/build/index.html`));
});

app.get('/tb_images/:img', (req, res) => {
  /*if(req.params.img) {
    let image = new Media(req.params.img);
    image.thumb(req, res);
    console.log(image);
    res.sendFile(path.join(__dirname , 'uploads',image.src));
  } else {
    res.sendStatus(403);
  }*/
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
  
});
app.get('/images/:img', (req, res) => {
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
});


app.listen(process.env.PORT_APP);
module.exports = app;