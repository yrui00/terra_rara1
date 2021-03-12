const express = require('express');
const User = require('../models/userModel');
const { getToken } = require('../utils');
/* const crypto = require('crypto');
//const bcrypt = require('bcrypt');

crypto.randomBytes(16, (err, buf) => {
    //console.log(buf.toString('hex'));
});

const iv = crypto.randomBytes(16);
const key = '12345678123456781234567812345678';
 */
const router = express.Router();

router.post('/login' , async(req , res) => {
    //return res.send({message: req.body.login +' - ' + req.body.password});
    const loginUser = await User.findOne({
        login: req.body.login
    }, (err,data) => {
        
        if(err || !data) return res.send({message: 'Login ou Senha inválidos1.'});

        /* bcrypt.compare(req.body.password , data.password , (err, same) => {
            if(!same) return res.send({message: 'Login ou Senha inválidos.'});

            res.send({
                _id: loginUser.id,
                login: loginUser.login,
                token: getToken(loginUser)
            })

        })  */
          
        //const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        //const decrypted = decipher.update(data.password, 'hex', 'utf-8');
        //decrypted += decipher.final('utf-8');

        
        if( req.body.password == data.password ){
            res.send({
                _id: data.id,
                login: data.login,
                token: getToken(data)
            })
        } else {
            return res.send({message: 'Login ou Senha inválidos2.'});
        } 

    })
    
})

router.get("/createuser", async (req, res) => {
    try {
        const user = new User({
            login: 'admin',
            password: 'terrasraras83'
        })
        const newUser = await user.save();
        console.log(newUser);
        res.send(newUser);
    } catch (error) {
        res.send({message: error.message })
    }
})


module.exports = router;
