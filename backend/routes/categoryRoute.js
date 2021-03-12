const express = require('express');
//const { deleteCategory } = require('../../frontend/src/actions/categoryActions');
const Category = require('../models/categoryModel');

const router = express.Router();

const txtToSlug = (txt) => {
    txt = txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/º/g,'').replace(/ /g,'-');
    return txt;
}
router.get('/', async (req, res) => {
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'ASC'
        ? { titulo: 1 }
        : { titulo: -1 }
        : { _id: 1 };
        
    const slug = req.query.slug ? { slug: req.query.slug } : {};
    const id = req.query.id ? { _id: req.query.id } : {};
    const tipoCategoria = req.query.tipoCategoria ? { tipoCategoria: req.query.tipoCategoria } : {};
    console.log(slug);
    const categorys = await Category.find({ ...id,  ...slug, ...tipoCategoria }).sort(
        sortOrder
    );
    res.send(categorys);
})

router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findById( req.params.id );
        if(deletedCategory){
            await deletedCategory.remove();
            res.send({ message: "Categoria Excluida." });
        } else {
            res.send( "Erro ao excluir a categoria." );
        }
    } catch (error) {
        res.send({ message: error.message })
    }
})

router.post("/creatcategory", async (req, res) => {
    try {

        const cat = new Category({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            tipoCategoria: req.body.tipoCategoria,
            agrupador: req.body.categorySelected,
            arquivo: req.body.arquivo,
            slug: txtToSlug(req.body.titulo),
            cores: req.body.cores
        })
        
        const newCat = await cat.save();
        res.send(cat);
    } catch (error) {
        res.send({ message: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
        category.titulo = req.body.titulo;
        category.descricao = req.body.descricao;
        category.tipoCategoria = req.body.tipoCategoria;
        category.agrupador = req.body.categorySelected;
        category.arquivo = req.body.arquivo;
        category.slug = txtToSlug(req.body.titulo);
        category.cores = req.body.cores;
        
        const updatedCategory = await category.save();
        if (updatedCategory) {
            return res
          .status(200)
          .send({ message: 'Categoria editada', data: updatedCategory });
        }
    }
    return res.status(500).send({ message: 'Erro ao editar a categoria.' });
  });

module.exports = router;
