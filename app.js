process.env.PORT_APP = 5000;
const express = require('express');
const path = require('path');
const app = express();
const imageList = require('./backend/data_imagens.js');
const bodyParser = require('body-parser');
const Media = require('./backend/routes/resize');
const fs = require('fs');

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
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
});
app.get('/images/:img', (req, res) => {
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
});



app.get('/copy', (req, res) => {
  
  imageList.images.map((img) => {
    let newName = img.url.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('º','');
    var url = "./frontend/src/images_upload/" + img.url;
    copyFile(url,'./frontend/src/renomeadas/'+newName);

    return '';
  })

});

function copyFile(source, target, cb) {
  
  var cbCalled = true;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}


app.listen(process.env.PORT_APP);
module.exports = app;