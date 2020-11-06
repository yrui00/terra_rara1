const express = require('express');
const User = require('../models/userModel');
const { getToken } = require('../utils');

const router = express.Router();

router.post('/login' , async(req , res) => {
    const loginUser = await User.findOne({
        login: req.body.login,
        password: req.body.password
    })
    
    if(loginUser){
        res.send({
            _id: loginUser.id,
            login: loginUser.login,
            token: getToken(loginUser)
        })
    } else {
        res.status(401).send({msg: 'Login ou Senha inválidos.'})
    }
})

router.get("/createuser", async (req, res) => {
    try {
        const user = new User({
            login: 'admin',
            password: '321654'
        })
        const newUser = await user.save();
        res.send(user);
    } catch (error) {
        res.send({msg: error.message })
    }
})


module.exports = router;
