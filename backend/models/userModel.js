const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String , required: true, unique: true, index: true, dropDups: true },
    password: {type: String , required: true},
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;