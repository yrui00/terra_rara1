const express = require('express');
const { deleteCategory } = require('../../frontend/src/actions/categoryActions');
const Category = require('../models/categoryModel');

const router = express.Router();

router.get('/', async (req, res) => {

    
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
        ? { price: 1 }
        : { price: -1 }
        : { _id: 1 };
        
    const id = req.query.id ? { _id: req.query.id } : {};
    //console.log(id );
    const categorys = await Category.find({ ...id }).sort(
        sortOrder
    );
    res.send(categorys);
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findById( req.params.id );
        if(deletedCategory){
            await deletedCategory.remove();
            res.send({ msg: "Categoria Excluida." });
        } else {
            res.send( "Erro ao excluir a categoria." );
        }
    } catch (error) {
        res.send({ msg: error.message })
    }
})

router.post("/creatcategory", async (req, res) => {
    try {

        const cat = new Category({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
        })
        
        const newCat = await cat.save();
        res.send(cat);
    } catch (error) {
        res.send({ msg: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
        category.titulo = req.body.titulo;
        category.descricao = req.body.descricao;
        const updatedCategory = await category.save();
        if (updatedCategory) {
            return res
          .status(200)
          .send({ msg: 'Categoria editada', data: updatedCategory });
        }
    }
    return res.status(500).send({ msg: 'Erro ao editar a categoria.' });
  });

module.exports = router;
