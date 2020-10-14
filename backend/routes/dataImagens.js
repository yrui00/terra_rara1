const express = require('express');
const router = express.Router();
const imageList = require('./backend/data_imagens.js');

router.get('/api/jsonimgs', (req, res) => {
    res.send(imageList);
})


export default router;