const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    titulo: {type: String , required: true, unique: false },
    codigo: {type: String , required: false , unique: false },
    tamanho: {type: String , required: false , unique: false  },
    modelo: {type: String , required: false , unique: false  },
    cor: {type: String ,  required: false , unique: false  },
    descricao: {type: String , required: false , unique: false },
    categoria: {type: Array , required: false , unique: false  },
    preco: {type: String , required: false , unique: false },
    imagens: {type: Array , required: false , unique: false  },
    created: {type: Date, default: Date.now , unique: false },
    destaque: {type: Boolean, default: false , unique: false },
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;