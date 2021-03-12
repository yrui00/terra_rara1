import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';
import { downloadCatalogo, getProducts } from '../actions/geralActions';
import renderHTML from 'react-render-html';



function ProductAdmScreen(props) {

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const dt = new Date();

    var params = new URLSearchParams(window.location.search);

    const titulo = (params.get('tit') ? params.get('tit') : '');
    const category = (params.get('cat') ? params.get('cat') : '');

    const productList = useSelector((state) => state.productList);
    const { product, success } = productList;
    //const listProd = getProducts(product.concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product).concat(product), { idCat: category });
    const listProd = getProducts(product, { idCat: category });

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());

    }, []);



    return (

        <div className="pgAdmin catalogo">

            <div className="evtsCatalogo">
                <h1 >
                    {renderHTML(titulo)}
                </h1>
                <div className="contentTopo">
                    <button className="linkAdd btAdmin" onClick={() => downloadCatalogo(listProd,titulo)}>Baixar Catalogo</button>
                </div>
            </div>


            <div className="contentCatalogo site">
                <div className="categoriaCatalogo" >
                    {titulo}
                </div>
                <div className="dataCatalogo">{meses[dt.getMonth()]}/{dt.getFullYear()}</div>

                <div>
                    <ul className="itensCatalogo">
                        {listProd.map((prod, i) =>
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
                    </ul>

                </div>
            </div>



        </div>
    )
}



export default ProductAdmScreen;