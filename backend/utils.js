const jwt = require('jsonwebtoken');
const config = require('./config');

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        login: user.login
    }, config.JWT_SECRET, {
        expiresIn: '6H'
    } );
}

module.exports = {
    getToken
}