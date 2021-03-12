import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './menuAdmin';
import { deleteProduct, registerProduct, listProduct, uploadImageProduct, delImage } from '../../actions/productActions';
import { listCategory } from '../../actions/categoryActions';
import Select from '@material-ui/core/Select';
import Pagination from '@material-ui/lab/Pagination';


function ProductAdmScreen(props) {

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [destaque, setDestaque] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [modelo, setModelo] = useState('');
    const [cor, setCor] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [inputFile] = useState([]);
    const [imagesUploaded, setImagesUploaded] = useState([]);
    const [alertThumb, setAlertThumb] = useState('');

    const [optionsCategorySelected, setOptionsCategorySelected] = useState([]);

    const uploadImage = useSelector((state) => state.uploadImage);
    const { image: imageUpload, finish: successImg, error: errorImg } = uploadImage;

    const productList = useSelector((state) => state.productList);
    const { product, success:successListProduct ,  error } = productList;
    const [productFilter , setProductFilter] = useState([]);
    

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
        dispatch(listCategory('','','1'));
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
            setTamanho(product.tamanho);
            setModelo(product.modelo);
            setCor(product.cor);
            setPreco(product.preco);
            setDescricao(product.descricao);
            setOptionsCategorySelected(product.categoria);
            setImagesUploaded(product.imagens);
            setDestaque(product.destaque);
            var ar = [];
            category.forEach(a => {
                product.categoria.forEach(b => {
                    if (a._id === b._id) {
                        ar.push(b._id);
                    }
                });
            });
            setOptionsCategorySelected(ar);
        } else {
            setId('');
            setTitulo('');
            setCodigo('');
            setTamanho('');
            setModelo('');
            setCor('');
            setPreco('');
            setDescricao('');
            setDestaque(false);
            setOptionsCategorySelected([]);
            setImagesUploaded([]);
        }
    };

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        var arCat = [];
        optionsCategorySelected.forEach(a => {
            category.forEach(b => {
                if (a === b._id) {
                    arCat.push(b);
                }
            });
        });

        setOptionsCategorySelected(arCat);

        dispatch(
            registerProduct({
                _id: id,
                titulo,
                codigo,
                tamanho,
                modelo,
                cor,
                preco,
                descricao,
                categoria: arCat,
                imagens: imagesUploaded,
                destaque,
            })
            //categoria: valCategory.map(o => ({ _id: o.value, titulo: o.label })),
        );
    }

    useEffect(() => {
        if (successImg) {
            setImagesUploaded([...imagesUploaded, imageUpload]);
            if (imagesUploaded.filter((e) => e.isThumb === true).length === 0) {
                setAlertThumb('Selecione uma imagem para ser Thumb');
            }
        }

        return () => {
            //
        };
    }, [successImg, errorImg ]);

    const onChangeImg = async (e) => {
        
        //setInputFile(e.target.files)
        Array.from(e.target.files).forEach(file => {
            const formData = new FormData();
            
            var arN = file.name.split('.');
            var newName = '';
            arN.map((i, j) => {
                newName = String(newName) + String(i);
                if (j === arN.length - 2) {
                    newName += String(new Date().valueOf());
                    newName += '.';
                }
            })
            
            formData.append('file', file , newName);
            
            const head = { headers: { 'Content-Type': 'multipart/form-data' } }
            dispatch(uploadImageProduct(formData, head));
        });

    }

    const removeImg = async (img) => {
        try {
            dispatch(delImage(img.fileName));
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
        setOptionsCategorySelected(value);
    }

    const handleFilterCategory = (e) => {
        setCurrentPage(1);
        var ar = []
        
        if(e.target.value !== ''){
            for (let i = 0, l = product.length; i < l; i += 1) {
                //console.log(product[i].categoria , e.target.value)
                var push = false;
                product[i].categoria.map((cat) => {
                    if (cat._id === e.target.value) {
                        push = true;
                    }
                })
                if(push) ar.push(product[i]);
            }
            setProductFilter(ar);
        } else {
            setProductFilter(product);
        }
    }

    useEffect(() => {
        if(successListProduct){
            setProductFilter(product);
        }

        return () => {
            //
        };
    }, [successListProduct]);


    
    
    ///// paginaçao
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const postsPagination = productFilter.slice(indexOfFirstPost, indexOfLastPost);

    const evtPaginate = (obj, num) => {
        setCurrentPage(num);
    }



    return (

        <div className="pgAdmin">
            <MenuAdmin />
            <div className="contentAdmin">
                <div className="topAdmin">
                    <h1 >
                        Produtos
                    </h1>
                    {!modalVisible && <div className="contentTopo">
                        <div className="contFiltro" >
                            <div className="campoFiltro">
                                <label htmlFor="select-filter">Categoria </label>
                                <Select
                                    native
                                    inputProps={{
                                        id: 'select-filter',
                                    }}
                                    onChange={handleFilterCategory}
                                    className="selectCat"
                                >
                                    <option key="" value="" ></option>
                                    {category.map((cat) => (
                                        <option key={cat._id} value={cat._id} >
                                            {cat.titulo}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <button className="linkAdd btAdmin" onClick={() => openModal({})}>Adicionar+</button>
                    </div>
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
                                    <label htmlFor="codigo">Destaque</label>
                                    <div className={destaque ? 'checkDest checked' : 'checkDest'} onClick={(e) => setDestaque(!destaque)} ></div>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="codigo">Codigo</label>
                                    <input type="text" name="codigo" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="tamanho">Tamanho</label>
                                    <input type="text" name="tamanho" id="tamanho" value={tamanho} onChange={(e) => setTamanho(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="modelo">Modelo</label>
                                    <input type="text" name="modelo" id="modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} ></input>
                                </li>
                                <li className="lineForm">
                                    <label htmlFor="cor">Cor</label>
                                    <input type="text" name="cor" id="cor" value={cor} onChange={(e) => setCor(e.target.value)} ></input>
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
                                    <label htmlFor="select-multiple-category">Categoria</label>
                                    <div className="contSelect">
                                        <Select
                                            native
                                            multiple
                                            value={optionsCategorySelected}
                                            inputProps={{
                                                id: 'select-multiple-category',
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
                                    <input type="file" value={inputFile} multiple="multiple" accept="image/x-png,image/gif,image/jpeg"  onChange={(e) => onChangeImg(e)} />
                                </li>
                                {errorImg && <li className="lineForm error">{errorImg}</li>}
                                {imagesUploaded.length > 0 && alertThumb && <li className="lineForm error">{alertThumb}</li>}
                                <li className="lineForm imgsPreview">
                                    {imagesUploaded.map((img) =>
                                        <div key={img.fileName} className={"tbUploaded " + (img.isThumb && 'thumb')} onClick={(e) => toggleThumb(img)} >
                                            <div className="btX" onClick={(e) => removeImg(img)}>x</div>
                                            <img src={"/images/" + img.fileName} type={img.fileName} alt={img.fileName} />
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
                    <div>
                        <ul className="itensAdm">
                            {postsPagination.map((prod, i) =>
                                <li key={prod._id} className="product" >
                                    <div className="s10">
                                        {prod.codigo}
                                    </div>
                                    <div className="tit">
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
                            {productFilter.length === 0 &&
                                <li>
                                    <span className="s10"></span>
                                    <span >Nenhum produto encontrado</span>
                                </li>
                            }
                        </ul>
                        {Math.ceil(productFilter.length / postPerPage) > 1 &&
                            <div className="paginationAdm">
                                <Pagination
                                    count={Math.ceil(productFilter.length / postPerPage)}
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
export default ProductAdmScreen;