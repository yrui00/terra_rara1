import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './menuAdmin';
import { deleteCategory , registerCategory, listCategory } from '../../actions/categoryActions';

function CategoryAdmScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id , setId] = useState('');
    const [titulo , setTitulo] = useState('');
    const [descricao , setDescricao] = useState('');
    const categoryList = useSelector((state) => state.categoryList);
    const { category, error } = categoryList;
    
    const categorySave = useSelector((state) => state.categorySave);
    const {
        success: successSave,
    } = categorySave;
    
    const categoryDelete = useSelector((state) => state.categoryDelete);
    const {
      success: successDelete,
    } = categoryDelete;


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listCategory());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (category) => {
        setModalVisible(true);
        setId(category._id);
        setTitulo(category.titulo);
        setDescricao(category.descricao);
      };

    const deleteHandler = (id) => {
        dispatch(deleteCategory(id));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            registerCategory({ 
                _id: id,
                titulo, 
                descricao
            })
        );
    }
    
    return (

        <div className="pgAdmin">
            <MenuAdmin />
            <div className="contentAdmin">
                <div className="topAdmin">
                    <h1 >
                        Categorias
                    </h1>
                    {!modalVisible &&
                        <button className="linkAdd btAdmin" onClick={() => openModal({})}>Adicionar+</button>
                    } 
                    {modalVisible &&
                        <button className="linkAdd btAdmin" onClick={() => setModalVisible(false)}> Voltar </button>
                    } 
                </div>
                {modalVisible &&
                    <form onSubmit={submitHandler}>
                        <ul className="contFormAdm">
                            {error && <li className="lineForm error">{error}</li>} 
                            <li className="lineForm">
                                <label htmlFor="titulo">Categoria *</label>
                                <input type="text" maxLength="50" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} ></input>
                            </li>
                            <li className="lineForm">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea name="descricao" rows="8" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                            </li>
                            <li className="lineForm">
                                <button className="btAdmin" >{id ? 'Atualizar' : 'Enviar'}</button>
                            </li>
                        </ul>
                    </form>
                }
                {!modalVisible &&
                    <ul className="itensAdm">
                        {category.map((cat, i) =>
                            <li key={cat._id} className="category" >
                                <div className="tit s75">
                                    {cat.titulo}
                                </div>
                                <div className="bts">
                                    <button className="btAdmin2" onClick={() => openModal(cat)}>
                                        Editar
                                    </button>{' '}
                                    <button className="btAdmin2" onClick={() => deleteHandler(cat._id)}>Excluir</button>
                                </div>
                            </li>
                        )}
                    </ul>
                }
            </div>

        </div>
    )
}
export default CategoryAdmScreen;