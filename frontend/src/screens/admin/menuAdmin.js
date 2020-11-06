import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {  logout } from '../../actions/userActions';

function MenuAdmin(props) {
    
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(true);
    
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/admin/login");
    }

    const handdlebtMobile = () => {
        setMenuOpen(!menuOpen);
    }
    return (

        <div className={"menuAdmin"+(menuOpen ? " " : " on") } >
            <ul className="contBts">
                <li className="titMenu">
                <Link to={'/admin'}>Admin Terras Raras</Link>
                </li>
                <li>
                    <Link to={'/admin/produtos'}>Produtos</Link>
                </li>
                <li>
                    <Link to={'/admin/categorias'}>Categorias</Link>
                </li>
                <li>
                    <Link to={'/admin/listaimagens'}>Lista Imagens</Link>
                </li>
                <li className="linkSair">
                    <button type="button" onClick={handleLogout} className="btLogout">Sair</button>
                </li>
            </ul>
            <button className="btMobile" onClick={handdlebtMobile}></button>
        </div>

    )
}
export default MenuAdmin;