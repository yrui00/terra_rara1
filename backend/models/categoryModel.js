const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    titulo: {type: String , required: true, unique: true, index: true, dropDups: true },
    descricao: {type: String , required: false },
})

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;