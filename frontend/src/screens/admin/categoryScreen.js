import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './menuAdmin';
import { delCategory, registerCategory, listCategory, uploadImageCat } from '../../actions/categoryActions';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { SketchPicker } from 'react-color'


function CategoryAdmScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectCatVisible, setSelectCatVisible] = useState(false);
    const [inputFile] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [cores, setCores] = useState([]);
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipoCategoria, setTipoCategoria] = useState('');
    const [descricao, setDescricao] = useState('<p>Descrição</p>');
    const categoryList = useSelector((state) => state.categoryList);
    const { category, error } = categoryList;
    const [categorySelected, setCategorySelected] = useState([]);

    const [imagesUploaded, setImagesUploaded] = useState([]);
    const uploadImage = useSelector((state) => state.uploadImage);
    const { image: imageUpload, finish: successImg, error: errorImg } = uploadImage;

    const categorySave = useSelector((state) => state.categorySave);
    const {
        success: successSave,
    } = categorySave;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { success: successDelete } = categoryDelete;


    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listCategory('', 'ASC'));
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (category) => {
        setModalVisible(true);
        if (category._id) {
            setCores(category.cores);
            setImagesUploaded(category.arquivo);
        } else {
            setSelectCatVisible(false);
            setCores([]);
            setImagesUploaded([]);
        }
        setCurrentColor('');
        setId(category._id);
        setTitulo(category.titulo);
        setDescricao(category.descricao);
        setTipoCategoria(category.tipoCategoria);
        setCategorySelected(category.agrupador);

        if (category.arquivo) {
        } else {

        }

        if (category.tipoCategoria === 1) {
            setSelectCatVisible(true);
        } else {
            setSelectCatVisible(false);
        }


        setTimeout(function () {
            var myCheckbox = document.getElementsByName("tipoCat");
            Array.prototype.forEach.call(myCheckbox, function (el) {
                el.checked = parseInt(el.value) === category.tipoCategoria;
            });
        }, 2)
    };

    const deleteHandler = (id) => {
        dispatch(delCategory(id));
    }

    const submitHandler = (e) => {


        e.preventDefault();

        dispatch(
            registerCategory({
                _id: id,
                titulo,
                descricao,
                tipoCategoria,
                categorySelected,
                arquivo: imagesUploaded,
                cores
            })
        );
    }
    
    const onChangeCatalogo = async (e) => {

        Array.from(e.target.files).forEach(file => {
            const formData = new FormData();
            
            var arN = file.name.split('.');
            var newName = '';
            arN.map((i, j) => {
                newName = String(newName) + String(i);
                if (j == arN.length - 2) {
                    newName += String(new Date().valueOf());
                    newName += '.';
                }
            })
            
            formData.append('file', file , newName);
            const head = { headers: { 'Content-Type': 'multipart/form-data' } }
            dispatch(uploadImageCat(formData, head));
        });

    }

    useEffect(() => {
        if (successImg) {
            setImagesUploaded([imageUpload]);
        }

        return () => {
            //
        };
    }, [successImg, errorImg]);


    ///// paginaçao
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(20);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const postsPagination = category.slice(indexOfFirstPost, indexOfLastPost);

    const evtPaginate = (obj, num) => {
        setCurrentPage(num);
    }

    function selectOne(e) {
        var myCheckbox = document.getElementsByName("tipoCat");
        Array.prototype.forEach.call(myCheckbox, function (el) {
            el.checked = false;
        });
        e.target.checked = true;
        setTipoCategoria(e.target.value);
        if (e.target.value === '1') {
            setSelectCatVisible(true);
        } else {
            setSelectCatVisible(false);
        }

    }


    const handdleChange = (event) => {

        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCategorySelected(value);

    }

    const updateColor = (color) => {
        setCurrentColor(color.hex);
    }
    const pushColor = (e) => {
        if (currentColor !== '') setCores([...cores, { cor: currentColor, nome: '' }]);
        e.preventDefault();
        return false;
    }
    const removeCor = (e, c) => {
        if (cores.indexOf(c) >= 0) {
            cores.splice(cores.indexOf(c), 1);
        }
        setCores([...cores]);
        e.preventDefault();
        return false;
    }

    const uptadeColors = (val, obj) => {
        if (cores.indexOf(obj) >= 0) {
            cores[cores.indexOf(obj)].nome = val;
        }
        setCores([...cores]);
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
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={descricao}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setDescricao(data);
                                        //console.log({ event, editor, data });
                                    }}

                                />
                            </li>
                            <li className="lineForm ">
                                <label htmlFor="arquivo">Imagem</label>
                                <input type="file" value={inputFile} multiple="multiple" accept="image/x-png,image/gif,image/jpeg" onChange={(e) => onChangeCatalogo(e)} />
                            </li>
                            <li className="lineForm imgsPreview">
                                {imagesUploaded.map((img) =>
                                    <div key={img.fileName} className={"tbUploaded "} >
                                        <img src={"/images/" + img.fileName} type={img.fileName} alt={img.fileName} />
                                        <input type="text" readOnly name='arquivo' value={img.fileName} />
                                        <button className="btX" onClick={(e) => setImagesUploaded([])} >x</button>
                                    </div>
                                )}
                            </li>
                            <li className="lineForm ">
                                <label htmlFor="arquivo">Cores</label>
                                <div className="colorPicker" >
                                    <SketchPicker
                                        color={currentColor}
                                        onChangeComplete={updateColor}
                                    />
                                </div>
                                <button className="confirmarCor" onClick={(e) => pushColor(e)} >Adicionar Cor</button>
                            </li>
                            <li className="lineForm contCores">
                                {cores.map((c) =>
                                    <div className="contCor" key={c.cor} style={{ backgroundColor: c.cor }} >
                                        <div className="titulo" >
                                            <input type="text" value={c.nome} onChange={(e) => uptadeColors(e.target.value, c)} ></input>
                                        </div>
                                        <button className="btX" onClick={(e) => removeCor(e, c)} >x</button>
                                    </div>
                                )}
                            </li>

                            <li className="lineForm ">
                                <label htmlFor="">Tipo Categoria</label>
                                <label htmlFor="tipoCat1">
                                    <input type="checkbox" name="tipoCat" id="tipoCat1" value="1" onChange={(e) => selectOne(e)} />
                                    Subcategoria
                                </label>
                                <label htmlFor="tipoCat0">
                                    <input type="checkbox" name="tipoCat" id="tipoCat0" value="0" onChange={(e) => selectOne(e)} />
                                    Categoria
                                </label>
                            </li>
                            {selectCatVisible &&
                                <li className="lineForm">
                                    <div className="contSelect">
                                        <Select
                                            native
                                            multiple
                                            inputProps={{
                                                id: 'select-multiple-category',
                                            }}
                                            value={categorySelected}
                                            onChange={handdleChange}
                                        >
                                            {category.map((cat) => (
                                                cat.tipoCategoria === 0 &&
                                                <option key={cat._id} value={cat._id}>{cat.titulo}</option>
                                            ))}
                                        </Select>

                                    </div>
                                </li>
                            }
                            <li className="lineForm">
                                <button className="btAdmin" >{id ? 'Atualizar' : 'Enviar'}</button>
                            </li>
                        </ul>
                    </form>
                }
                {!modalVisible && <div>
                    <ul className="itensAdm">
                        {postsPagination.map((cat) =>
                            <li key={cat._id} className="category" >
                                <div className="tit">
                                    {cat.titulo}
                                </div>
                                <div className="bts">
                                    <button className="btAdmin2" onClick={() => openModal(cat)} >Editar</button>
                                    <button className="btAdmin2" onClick={() => deleteHandler(cat._id)} >Excluir</button>
                                </div>
                            </li>
                        )}
                    </ul>
                    {Math.ceil(category.length / postPerPage) > 1 &&
                        <div className="paginationAdm">
                            <Pagination
                                count={Math.ceil(category.length / postPerPage)}
                                page={currentPage}
                                onChange={evtPaginate}
                            />
                        </div>
                    }

                </div>
                }
            </div>

        </div>
    )
}
export default CategoryAdmScreen;