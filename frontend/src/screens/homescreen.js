import React from 'react';
import TopoSite from './topoSite.js';
import Carrossel from './carrossel.js';
import Rodape from './rodape.js';
import Destaques from './destaques.js';


function HomeScreen() {

    return (
        <div className="content" >
            <TopoSite />
            <Carrossel />
            <div className="banner"></div>

            <Destaques produtos="destaques" />

            <Rodape />
        </div>
    )
}
export default HomeScreen;