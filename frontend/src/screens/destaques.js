import React from 'react';
import renderHTML from 'react-render-html';

function Destaques(props) {
    let titulo = '';
    if(props.produtos === 'destaques'){
        titulo = 'Nossos <span>Destaques</span>';
    } else if(props.produtos === 'novidades'){
        titulo = 'Nossas <span>Novidades</span>';
    }
    return (
        <div>
            <div className="center">
                <div className="destaques">
                    <div className="titulo">
                        <div className="txt">
                          {renderHTML(titulo)}
                        </div>
                    </div>
                    <div className="infoProduto">
                        <img src="/images/cursor_n5_gota_latonado_2-0025.jpg" alt="" />
                        <div className="titP">
                            <div>Cursor nº3 comum bronze</div>
                            <div>CÓD: 3456B</div>
                        </div>
                    </div>
                    <div className="infoProduto">
                        <img src="/images/cursor_n5_gota_latonado_2-0025.jpg" alt="" />
                        <div className="titP">
                            <div>Cursor nº3 comum bronze</div>
                            <div>CÓD: 3456B</div>
                        </div>
                    </div>
                    <div className="infoProduto">
                        <img src="/images/cursor_n5_gota_latonado_2-0025.jpg" alt="" />
                        <div className="titP">
                            <div>Cursor nº3 comum bronze</div>
                            <div>CÓD: 3456B</div>
                        </div>
                    </div>
                    <div className="infoProduto">
                        <img src="/images/cursor_n5_gota_latonado_2-0025.jpg" alt="" />
                        <div className="titP">
                            <div>Cursor nº3 comum bronze</div>
                            <div>CÓD: 3456B</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Destaques;