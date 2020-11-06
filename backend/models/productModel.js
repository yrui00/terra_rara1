const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    titulo: {type: String , required: true, unique: false },
    codigo: {type: String , required: false, unique: true },
    descricao: {type: String , required: false },
    categoria: {type: Array , required: false },
    preco: {type: String , required: false },
    imagens: {type: Array , required: false },
    created: {type: Date, default: Date.now },
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;