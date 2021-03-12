process.env.PORT_APP = 5000;
const express = require('express');
const path = require('path');
const app = express();
const imageList = require('./backend/data_imagens.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const config = require('./backend/config');
const mongoose = require('mongoose');
const userRoute = require('./backend/routes/userRoute');
const categoryRoute = require('./backend/routes/categoryRoute');
const productRoute = require('./backend/routes/productRoute');
const uploadImageRoute = require('./backend/routes/uploadImageRoute');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

const pdf = require('html-pdf');
const pdfTemplate = require('./backend/models/layoutPdf');


dotenv.config();
const mongodbURL = config.MONGODB_URL;
//console.log(mongodbURL);
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error));

mongoose.connection.on('connected', () => {
  console.log('CONECTADO AO BANCO')
})

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(morgan('dev'));

//app.use(express.static(path.join('frontend','build')));

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/upload-image", uploadImageRoute);

app.get('/api/jsonimgs', (req, res) => {
  res.send(imageList);
})

app.get('/tb_images/:img', (req, res) => {
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
});
app.get('/images/:img', (req, res) => {
  res.sendFile(path.join(`${__dirname}/uploads/${req.params.img}`));
});


app.post('/api/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile(`${__dirname}/uploads/result.pdf`, (err) => {
    if (err) {""
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get('/api/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/uploads/result.pdf`)
})



/*
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
  rd.on("error", function (err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function (err) {
    done(err);
  });
  wr.on("close", function (ex) {
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
*/


app.listen(process.env.PORT_APP);
module.exports = app;