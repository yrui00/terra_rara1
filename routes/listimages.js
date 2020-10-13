const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
  return res.send({message: 'OKOKOKOK'});
  //return res.sendFile(path.join('terra_rara1', 'build', 'index.html'));
  //return res.sendFile('./terra_rara1/build/index.html');
});

module.exports = router;