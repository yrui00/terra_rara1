const express = require('express');
const fs = require('fs');
//const { txtToSlug } = require('../../frontend/src/actions/geralActions');

const router = express.Router();

router.post('/', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const file = req.files.file;
    const nameImg = txtToSlug(file.name);
    
    if(!fs.existsSync(`./uploads/${nameImg}`) ){
        file.mv(`./uploads/${nameImg}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({ fileName: nameImg, filePath: `/images/${nameImg}` });
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

const txtToSlug = (txt) => {
    txt = txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/º/g,'').replace(/ /g,'-');
    return txt;
}



module.exports = router;
