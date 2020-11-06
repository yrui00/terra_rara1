const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    if(!fs.existsSync(`./uploads/${file.name}`) ){
        file.mv(`./uploads/${file.name}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({ fileName: file.name, filePath: `/images/${file.name}` });
        });
    } else {
        res.json({ error:'Já existe um arquivo com esse nome' });
    }
});
router.delete('/:image', (req, res) => {
    const path = './uploads/'+req.params.image;
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
});





module.exports = router;
