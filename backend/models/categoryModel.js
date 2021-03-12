const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    titulo: {type: String , required: true, unique: true, index: true, dropDups: true },
    descricao: {type: String , required: false },
    tipoCategoria: {type: Number , required: false },  
    agrupador: {type: Array , required: false },  
    slug: {type: String , required: false },  
    created: {type: Date, default: Date.now },
    arquivo: {type: Array, required: false },
    cores: {type: Array, required: false },
})

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;