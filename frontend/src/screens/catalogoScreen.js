import React, { useEffect, useState } from 'react';
import TopoSite from './topoSite.js';
import Carrossel from './carrossel.js';
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../actions/categoryActions.js';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { listProduct } from '../actions/productActions.js';
import { downloadCatalogo, getProducts, getStyle, meses } from '../actions/geralActions.js';



function CatalogoScreen(props) {

    const dispatch = useDispatch();
    const [modelos, setModelos] = useState([]);
    const [arProdutos, setArProdutos] = useState([]);
    const categoryList = useSelector((state) => state.categoryList);
    const { category, success: successCat } = categoryList;
    const categoryList2 = useSelector((state) => state.categoryListSrc);
    const { categorySrc, successSrc } = categoryList2;
    const productList = useSelector((state) => state.productList);
    const { product: jsonProdutos, success: successProd } = productList;

    const [leftBts, setLeftBts] = useState({ left: 0 });


    useEffect(() => {
        if (jsonProdutos.length > 0 && successCat) {
            let ar = [];
            jsonProdutos.map((p) => {
                p.categoria.map((c) => {
                    if (c._id === category[0]._id) {
                        ar.push(p);
                    }
                })
            })
            console.log(ar)
            setArProdutos(ar);
        }
    }, [jsonProdutos, successCat]);

    useEffect(() => {
        dispatch(listCategory(props.match.params[0]));
        dispatch(listProduct());
        return () => {
            //
        };
    }, [props.match.params[0]]);
    useEffect(() => {
        if (successCat) {
            var ar = [];
            categorySrc.map((e) => {
                if (e.agrupador[0] === category[0]._id) {
                    ar.push(e);
                }
            })
            setModelos(ar);

        }
        return () => {
            //
        };
    }, [successCat]);




    var lastDt = new Date('1993-03-14T03:39:54.055+00:00');
    var lastDt2 = new Date('1993-03-14T03:39:54.055+00:00');
    jsonProdutos.map((e) => {
        if (new Date(e.created) > lastDt) {
            lastDt = new Date(e.created);
        }
    })



    const moveBts = (dir) => {
        var el = document.getElementsByClassName("btsCarrossel");
        var el2 = document.getElementsByClassName("ovBts");
        var l = parseInt(getStyle(el[0], 'left'));

        var move = 180 * 3;
        if (dir === 'left') {
            l += move;
            if (l >= 0) {
                l = 0;
            }
        } else {
            l -= move;
            if (l < (parseInt(getStyle(el2[0], 'width')) - parseInt(getStyle(el[0], 'width')))) {
                l = (parseInt(getStyle(el2[0], 'width')) - parseInt(getStyle(el[0], 'width')));
            }
        }
        setLeftBts({ left: l });

    }



    return (
        <div className="content" >
            <TopoSite />
            <Carrossel />
            {category.map((cat) =>
                <div className="contCatalogo" key={cat}>
                    <div className="center">
                        <div className="fl">
                            <div className="colEsq">
                                <div className="tituloCatalogo">{cat.titulo}</div>
                                <div className="descricaoCat">{cat.descricao && renderHTML(cat.descricao)}</div>
                                <div className="cores">
                                    {cat.cores.map((c) =>
                                        <div className="cor" key={c.nome}  >
                                            <div className="boxCor" style={{ backgroundColor: c.cor }}  ></div>
                                            <div className="titulo" >{c.nome}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="colDir">
                                {cat.arquivo.map((img) =>
                                    <img className="imageCat" src={"/images/" + img.fileName} key={img.fileName} />
                                )}
                                {/* <div className="btCatalogo" onClick={() => downloadCatalogo(getProducts(jsonProdutos, { idCat: cat._id }), 'Catalogo ' + cat.titulo)}> */}
                                <Link className="btCatalogo"
                                    to={"/imprimir_catalogo?cat=" + cat._id + "&tit=" + cat.titulo} 
                                    target="_blank" >
                                    <span className="tx1" >CATÁLOGO DE</span>
                                    <span className="tx2" >{cat.titulo}</span>
                                    <span className="data" >
                                        <strong>Versão atualizada:</strong>
                                        {meses[new Date(lastDt).getMonth()]}/{new Date(lastDt).getFullYear()}
                                    </span>
                                </Link>
                        </div>
                        {modelos.length > 0 &&
                            <div className="modelo">
                                <div className="titModelo" > MODELOS </div>
                                {modelos.map((mod) =>
                                    <div className="cont" key={mod._id} >
                                        <div className="imageModelo">
                                            {mod.arquivo.map((img) =>
                                                <img className="imageCat" src={"/images/" + img.fileName} key={img.fileName} />
                                            )}
                                            <div className="titulo">{mod.titulo}</div>
                                        </div>

                                        <Link className="btCatalogo2"
                                            to={"/imprimir_catalogo?cat=" + mod._id + "&tit=" + cat.titulo} 
                                            target="_blank" >
                                            <span className="tx1">CATÁLOGO</span>
                                            <span className="data">
                                                <strong>Versão atualizada:</strong>
                                                {meses[new Date(mod.created).getMonth()]}/{new Date(mod.created).getFullYear()}
                                            </span>
                                        </Link>
                                        <Link className="btConheca" to={"/catalogo/" + mod.slug}  >conheça o produto! »</Link>
                                    </div>
                                )}
                            </div>
                        }

                        {arProdutos.length > 0 &&
                            <div className="destaques">

                                <div className="carrossel c2">
                                    <button className="setaEsq" onClick={(e) => moveBts('left')} ></button>
                                    <div className="ovBts">
                                        <div className="btsCarrossel" style={leftBts} >
                                            {arProdutos.map((prod) =>
                                                <div key={prod._id} data-to={'/catalogo/' + prod.slug} className="quadProd" >
                                                    <div className="btCat">
                                                        {prod.imagens.slice(0, 1).map((a) =>
                                                            <div className="image" key={a.fileName}>
                                                                <img src={"/images/" + a.fileName} alt={a.fileName} />
                                                            </div>
                                                        )}
                                                        <div className="titulo2">{prod.titulo}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button className="setaDir" onClick={(e) => moveBts('rigth')} ></button>
                                </div>

                            </div>
                        }
                    </div>


                </div>
                </div>
    )
}


        </div >
    )
}
export default CatalogoScreen;