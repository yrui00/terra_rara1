const express = require('express');
const { deleteProduct } = require('../../frontend/src/actions/productActions');
const Product = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res) => {
    
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
        : { _id: 1 };
        
    const id = req.query.id ? { _id: req.query.id } : {};
    //console.log(id );
    const products = await Product.find({ ...id }).sort(
        sortOrder
    );
    res.send(products);
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findById( req.params.id );
        if(deletedProduct){
            await deletedProduct.remove();
            res.send({ msg: "Produto Excluido." });
        } else {
            res.send( "Erro ao excluir o produto." );
        }
    } catch (error) {
        res.send({ msg: error.message })
    }
})

router.post("/creatproduct", async (req, res) => {
    try {
        console.log('-------');
        console.log(req.body.categoria, req.body.imagens);
        console.log('-------');
        const prod = new Product({
            titulo: req.body.titulo,
            codigo: req.body.codigo,
            preco: req.body.preco,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            imagens: req.body.imagens,
        })
        
        const newProd = await prod.save();
        res.send(newProd);
    } catch (error) {
        res.send({ msg: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        console.log(req.body.categoria);
        product.titulo = req.body.titulo;
        product.codigo = req.body.codigo;
        product.preco = req.body.preco;
        product.descricao = req.body.descricao;
        product.categoria = req.body.categoria;
        product.imagens = req.body.imagens;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res
          .status(200)
          .send({ msg: 'Produto editado', data: updatedProduct });
        }
    }
    return res.status(500).send({ msg: ' Erro ao editar o produto.' });
  });

module.exports = router;
