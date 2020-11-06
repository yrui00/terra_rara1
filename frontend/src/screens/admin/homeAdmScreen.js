import React from 'react';
import MenuAdmin from './menuAdmin';

function HomeAdmScreen(props) {


    return (

        <div className="pgAdmin">
            <MenuAdmin />
            <div className="contentAdmin">
                <div className="homeAdm">Administrativo Terras Raras</div>
            </div>
            
        </div>

    )
}
export default HomeAdmScreen;