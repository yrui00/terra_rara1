const express = require('express');
const router = express.router();


router.get('/', function(req, res) {
  return res.sendFile(path.join('terra_rara1', 'build', 'index.html'));
});

module.exports = router;