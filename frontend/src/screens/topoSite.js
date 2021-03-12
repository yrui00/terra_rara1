import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategorySrc } from '../actions/categoryActions';
const { txtToSlug } = require('../actions/geralActions');


function TopoSite(props) {

    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(true);
    const [categorySearch, setCategorySearch] = useState([]);
    const categoryList = useSelector((state) => state.categoryListSrc);
    const { categorySrc } = categoryList;
    const [listaBusca, setListaBusca] = useState([]);


    useEffect(() => {
        dispatch(listCategorySrc());
        return () => {
        };
    }, []);

    useEffect(() => {
        setListaBusca(categorySrc);
        return () => {
        };
    }, []);
    
    const handdlebtMobile = () => {
        setMenuOpen(!menuOpen);
    }

    const search = (str) => {
        if (str !== '') {
            const filteredList = listaBusca.filter( cat => cat.titulo.toLowerCase().match(str) !== null );
            setCategorySearch(filteredList);
        } else {
            setCategorySearch([]);
        }
    }



    return (

        <header className={"header" + (menuOpen ? " " : " on")} >
            <div className="center">
                <Link to={'/'}>
                    <div className="logo"></div>
                </Link>
                <nav>
                    <ul className="contBts">
                        <li className="titMenu">
                            <Link to={'/'}>home</Link>
                        </li>
                        <li>
                            <Link to={'/quem-somos'}>quem somos</Link>
                        </li>
                        <li>
                            <Link to={'/catalogos'}>catálogos</Link>
                        </li>
                        <li>
                            <Link to={'/atendimento'}>atendimento</Link>
                        </li>
                        <li className="fone">
                            (11) 99876.5432
                    </li>
                        <li className="duv" >
                            <div className="icon"></div>
                        </li>
                    </ul>
                    <button className="btMobile" onClick={handdlebtMobile}></button>
                    <div className="busca">
                        <input type="text" name="busca" className="campoBusca" placeholder="O que você está buscando?" onChange={(e) => search(e.target.value)} />
                        
                        { categorySearch.length > 0 &&
                            <div className="listaSearch">
                                {categorySearch.map((cat) =>
                                    <Link key={cat._id} to={'/catalogo/' + txtToSlug(cat.titulo)} > {cat.titulo} </Link>
                                )}
                            </div>
                        }
                        <div className="btBuscar"></div>
                    </div>
                </nav>
            </div>
        </header>

    )
}
export default TopoSite;