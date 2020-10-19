const express = require('express');
const router = express.Router();
const dtList = require('../data_imagens.js');

router.get('/api/jsonimgs', (req, res) => {
    res.send(dtList);
})


module.exports = router;