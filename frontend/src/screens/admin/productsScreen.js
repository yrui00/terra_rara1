import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './menuAdmin';
import { deleteProduct, registerProduct, listProduct, uploadImageProduct, deleteImage } from '../../actions/productActions';
import { listCategory } from '../../actions/categoryActions';
import Select from '@material-ui/core/Select';


function ProductAdmScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [preco, setPreco] = useState('');
    const [valCategory, setValCategory] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [inputFile, setInputFile] = useState([]);
    const [imagesUploaded, setImagesUploaded] = useState([]);
    const [alertThumb, setAlertThumb] = useState('');

    const [optionsCategorySelected, setOptionsCategorySelected] = useState([]);

    const uploadImage = useSelector((state) => state.uploadImage);
    const { image: imageUpload, finish: successImg, error: errorImg } = uploadImage;

    const productList = useSelector((state) => state.productList);
    const { product, error } = productList;

    const categoryList = useSelector((state) => state.categoryList);
    const { category } = categoryList;

    const productSave = useSelector((state) => state.productSave);
    const { success: successSave, } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: successDelete, } = productDelete;

    const dispatch = useDispatch();


    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listCategory());
        dispatch(listProduct());
        return () => {
        };
    }, [successSave, successDelete]);



    const openModal = (product) => {
        setModalVisible(true);
        if (product._id) {
            setId(product._id);
            setTitulo(product.titulo);
            setCodigo(product.codigo);
            setPreco(product.preco);
            setDescricao(product.descricao);
            setValCategory(product.categoria);
            setImagesUploaded(product.imagens);
            var ar = [];
            category.map(a => {
                product.categoria.map(b => {
                    if (a._id == b._id) {
                        ar.push(b._id);
                    }
                });
            });
            setOptionsCategorySelected(ar);
        } else {
            setId('');
            setTitulo('');
            setCodigo('');
            setPreco('');
            setDescricao('');
            setValCategory([]);
            setImagesUploaded([]);
        }
    };

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        var arCat = [];
        optionsCategorySelected.map(a => {
            category.map(b => {
                if (a == b._id) {
                    arCat.push(b);
                }
            });
        });
        
        setValCategory(arCat);
        
        dispatch(
            registerProduct({
                _id: id,
                titulo,
                codigo,
                preco,
                descricao,
                categoria: arCat,
                imagens: imagesUploaded
            })
            //categoria: valCategory.map(o => ({ _id: o.value, titulo: o.label })),
        );
    }

    useEffect(() => {
        if (successImg) {
            setImagesUploaded([...imagesUploaded, imageUpload]);
            if (imagesUploaded.filter((e) => e.isThumb === true).length == 0) {
                setAlertThumb('Selecione uma imagem para ser Thumb');
            }
        }
        if (errorImg) {

        }
        return () => {
            //
        };
    }, [successImg, errorImg]);

    const onChangeImg = async (e) => {
        //setInputFile(e.target.files)
        Array.from(e.target.files).forEach(file => {
            const formData = new FormData();
            formData.append('file', file);
            const head = { headers: { 'Content-Type': 'multipart/form-data' } }
            dispatch(uploadImageProduct(formData, head));
        });

    }

    const removeImg = async (img) => {
        try {
            dispatch(deleteImage(img.fileName));
            var ind = imagesUploaded.indexOf(img);
            imagesUploaded.splice(ind, 1);
            setImagesUploaded([...imagesUploaded]);
        } catch (error) {

        }
    }

    const toggleThumb = (img) => {
        imagesUploaded.map((img) => {
            img.isThumb = false;
        })
        img.isThumb = true;
        setAlertThumb('');
        setImagesUploaded([...imagesUploaded]);
    }

    const handleMultiple = (e) => {
        const { options } = e.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        /* setValCategory(value ); */
        setOptionsCategorySelected(value);
    }


    return (

        <div className="pgAdmin">
            <MenuAdmin />
            <div className="contentAdmin">
                <div className="topAdmin">
                    <h1 >
                        Produtos
                    </h1>
                    {!modalVisible &&
                        <button className="linkAdd btAdmin" onClick={() => openModal({})}>Adicionar+</button>
                    }
                    {modalVisible &&
                        <button className="linkAdd btAdmin" onClick={() => setModalVisible(false)}> Voltar </button>
                    }
                </div>
                {modalVisible &&
                    <div>
                        <form onSubmit={submitHandler} >
                            <ul className="contFormAdm">
                                {error && <li className="lineForm error">{error}</li>}

                                <li className="lineForm">
                                    <label htmlFor="titulo">Titulo </label>
                                    <input type="text" name="titulo" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="codigo">Codigo</label>
                                    <input type="text" name="codigo" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="preco">Preço</label>
                                    <input type="text" name="preco" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="descricao">Descrição</label>
                                    <textarea name="descricao" rows="8" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="categorias">Categoria</label>
                                    <div className="contSelect">

                                        <Select
                                            native
                                            multiple
                                            value={optionsCategorySelected}
                                            inputProps={{
                                                id: 'select-multiple-native',
                                            }}
                                            onChange={handleMultiple}
                                        >
                                            {category.map((cat) => (
                                                <option key={cat._id} value={cat._id} >
                                                    {cat.titulo}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </li>
                                <li className="lineForm ">
                                    <label htmlFor="imagens">Imagens</label>
                                    <input type="file" value={inputFile} multiple="multiple" onChange={(e) => onChangeImg(e)} />
                                </li>
                                {errorImg && <li className="lineForm error">{errorImg}</li>}
                                {imagesUploaded.length > 0 && alertThumb && <li className="lineForm error">{alertThumb}</li>}
                                <li className="lineForm imgsPreview">
                                    {imagesUploaded.map((img) =>
                                        <div key={img.fileName} className={"tbUploaded " + (img.isThumb && 'thumb')} onClick={(e) => toggleThumb(img)} >
                                            <div className="btX" onClick={(e) => removeImg(img)}>x</div>
                                            <img src={"/images/" + img.fileName} type={img.fileName} />
                                            <input type="text" readOnly name='imagesGaleria[]' value={img.fileName} />
                                        </div>
                                    )}
                                </li>
                                <li className="lineForm">
                                    <button className="btAdmin" >{id ? 'Atualizar' : 'Enviar'}</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                }
                {!modalVisible &&
                    <ul className="itensAdm">
                        {product.map((prod, i) =>
                            <li key={prod._id} className="product" >
                                <div className=" s15">
                                    {prod.codigo}
                                </div>
                                <div className="tit s50">
                                    {prod.titulo}
                                </div>
                                <div className="bts">
                                    <button className="btAdmin2" onClick={() => openModal(prod)}>
                                        Editar
                                    </button>{' '}
                                    <button className="btAdmin2" onClick={() => deleteHandler(prod._id)}>Excluir</button>
                                </div>
                            </li>
                        )}
                        {product.length == 0 &&
                            <li>
                                <span className="s10"></span>
                                <span >Nenhum produto cadastrado</span>
                            </li>
                        }
                    </ul>
                }
            </div>

        </div>
    )
}
export default ProductAdmScreen;