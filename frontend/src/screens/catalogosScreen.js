import React, { useEffect, useState } from 'react';
import TopoSite from './topoSite.js';
import Carrossel from './carrossel.js';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../actions/categoryActions.js';
import Rodape from './rodape.js';
import { downloadCatalogo, getProducts, meses } from '../actions/geralActions.js';
import { listProduct } from '../actions/productActions.js';


function CatalogosScreen(props) {
    
    const dispatch = useDispatch();
    const [page] = useState(props.match.params[0]);

    const categoryList = useSelector((state) => state.categoryList);
    const { category } = categoryList;
    const productList = useSelector((state) => state.productList);
    const { product: jsonProdutos } = productList;

    useEffect(() => {
        dispatch(listCategory(page));
        dispatch(listProduct());
        return () => {
            //
        };
    }, []);

    var lastDt = new Date('1993-03-14T03:39:54.055+00:00');
    var lastDt2 = new Date('1993-03-14T03:39:54.055+00:00');
    jsonProdutos.map((e) => {
        if (new Date(e.created) > lastDt) {
            lastDt = new Date(e.created);
        }
    })


    return (
        <div className="content" >
            <TopoSite />
            <Carrossel />

            <div className="titPage">
                <div className="center">
                    <h1>Catalogos <br /><span>para download</span></h1>
                </div>
            </div>
            <div className="center ">
                <div className="infosDir">
                    <div className="txBaixeCatalago">
                        <p>Baixe nosso catálogo completo e <br /> conheça todos nossos produtos.</p>
                        <p>Fique por dentro das novidades!</p>
                    </div>
                    <br />

                    <div className="btCatalogo3" onClick={() => downloadCatalogo(getProducts(jsonProdutos, {}), 'Catalogo Completo')}>
                        <div className="tx1" >CATÁLOGO</div>
                        <div className="tx2" >COMPLETO</div>
                        <div className="data" >
                            <strong>Versão atualizada:</strong>
                            {meses[new Date(lastDt).getMonth()]}/{new Date(lastDt).getFullYear()}
                        </div>
                    </div>
                </div>
                <div className="txtEsq">
                    <p>Na busca por melhorar e facilitar ainda mais o atendimento e relacionamento com nossos clientes, disponibilizamos nossos catálogos, completo e também por categorias, para download.</p>

                    <p>Consulte nossos produtos a qualquer momento de forma rápida e fácil. <br />Sempre os atualizamos com todas as novidades. </p>


                </div>

                <div className="listaCatalogos">
                    <div className="titulo">
                        Veja nossos Catálogos <span>Por categoria</span>
                    </div>
                    {category.map((c) => c.tipoCategoria === 0 &&
                        <div className="contCat" key={c._id} >
                            <div className="btEsq" >
                                <div className="img" >
                                    {c.arquivo.map((b) =>
                                        <img src={"/images/" + b.fileName} alt={b.fileName} key={b.fileName} />
                                    )}
                                </div>

                                <div className="btCatalogo esq" onClick={() => downloadCatalogo(getProducts(jsonProdutos,{ idCat: c._id }), c.titulo)}>
                                    <div className="tx1" >CATÁLOGO DE</div>
                                    <div className="tx2" >{c.titulo}</div>
                                    <div className="data" >
                                        <strong>Versão atualizada:</strong>
                                        {lastDt2 = new Date(c.created), category.map((d) => {
                                            if (d.agrupador[0] === c._id && new Date(d.created) > lastDt2) {
                                                lastDt2 = new Date(d.created);
                                            }
                                        })}
                                        {meses[new Date(lastDt2).getMonth()]}/{new Date(lastDt2).getFullYear()}
                                    </div>
                                </div>
                            </div>

                            <div className="subCat">
                                <div className="cont" >
                                    {category.map((d) => d.agrupador[0] === c._id &&
                                        <div className="btCatalogo4" onClick={() => downloadCatalogo(getProducts(jsonProdutos,{ idCat: d._id }), c.titulo)} key={d._id}  >
                                            <div className="tx1" >{d.titulo}</div>
                                            <div className="data" >
                                                <strong>Versão atualizada:</strong>
                                                {meses[new Date(d.created).getMonth()]}/{new Date(d.created).getFullYear()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>


            <Rodape />

        </div>
    )
}
export default CatalogosScreen;