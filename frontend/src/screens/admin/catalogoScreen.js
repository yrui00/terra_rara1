import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../actions/productActions';
import { listCategory } from '../../actions/categoryActions';
import Select from '@material-ui/core/Select';
import MenuAdmin from './menuAdmin';
import { downloadCatalogo } from '../../actions/geralActions';



function ProductAdmScreen(props) {

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const dt = new Date();

    const [catCatalogo, setCatCatalogo] = useState('');
    const productList = useSelector((state) => state.productList);
    const { product, success: successListProduct } = productList;
    const [productFilter, setProductFilter] = useState([]);


    const categoryList = useSelector((state) => state.categoryList);
    const { category } = categoryList;

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(listCategory());
        dispatch(listProduct());
        return () => {
        };
    }, []);



    const handleFilterCategory = (e) => {

        var ar = [];
        category.filter(c => c._id === e.target.value).map(cat =>
            setCatCatalogo(cat.titulo)
        )
        if (e.target.value !== '') {
            for (let i = 0, l = product.length; i < l; i += 1) {
                //console.log(product[i].categoria , e.target.value)
                var push = false;
                product[i].categoria.map((cat) => {
                    if (cat._id === e.target.value) {
                        push = true;
                    }
                })
                if (push) ar.push(product[i]);
            }
            setProductFilter(ar);
        } else {
            setProductFilter(product);
        }
    }

    useEffect(() => {
        if (successListProduct) {
            
            setProductFilter(product);
        }

        return () => {
            //
        };
    }, [successListProduct, product]);



    

    return (

        <div className="pgAdmin catalogo">
        <MenuAdmin />
            <div className="evtsCatalogo">
                <h1 >
                    Catalogo
                </h1>
                <div className="contentTopo">
                    <div className="contFiltro" >
                        <div className="campoFiltro">
                            <label htmlFor="select-filter">Filtrar </label>
                            <Select
                                native
                                inputProps={{
                                    id: 'select-filter',
                                }}
                                onChange={handleFilterCategory}
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
                    <button className="linkAdd btAdmin" onClick={() => downloadCatalogo(productFilter, catCatalogo) }>Gerar Catalogo</button>
                </div>
            </div>


            <div className="contentCatalogo">
                <div className="categoriaCatalogo" >
                    {catCatalogo}
                </div>
                <div className="dataCatalogo">{meses[dt.getMonth()]}/{dt.getFullYear()}</div>

                <div>
                    <ul className="itensCatalogo">
                        {productFilter.map((prod, i) =>
                            <li key={Math.random()} className="product" >
                                {prod.imagens.slice(0, 2).map((img) =>
                                    <img src={img.filePath} alt={img.filePath} key={img.fileName} />
                                )}
                                <div className="info">
                                    <div className="cod">CÓD: {prod.codigo}</div>
                                    <div>Tamanho: {prod.tamanho}</div>
                                    <div>Modelo: {prod.modelo}</div>
                                    <div>Cor: {prod.cor}</div>
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

                </div>
            </div>



        </div>
    )
}

export default ProductAdmScreen;