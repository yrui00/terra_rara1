const mongoose = require('mongoose');
const crypto = require('crypto');
//const bcrypt = require('bcrypt');

crypto.randomBytes(16, (err, buf) => {
    //console.log(buf.toString('hex'));
});

const iv = crypto.randomBytes(16);
const key = '12345678123456781234567812345678';

const userSchema = new mongoose.Schema({
    login: {type: String , required: true, unique: true, index: true, dropDups: true },
    password: {type: String , required: true},
})

userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified('password')) return next();

    /* bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    })  */
    
    //const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    //const encrypted = cipher.update(user.password, 'utf-8', 'hex');
    //encrypted += cipher.final('hex');
    //user.password = encrypted;
    return next();

})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;