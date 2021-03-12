import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { txtToSlug } from '../actions/geralActions';

function Rodape(props) {

    const categoryListCarr = useSelector((state) => state.categoryListCarr);
    const { categoryCarr } = categoryListCarr;

    return (
        <div>
            <div className="barraDestaque">
                <div className="txtMeio">
                    <div>
                        Contamos com mais de <span className="f1">10.500</span> produtos <br />
                        <span className="f2">da melhor qualidade para você!</span>
                    </div>
                    <div className="btWhats"></div>
                </div>
            </div>

            <div className="rodape">
                <div className="center">
                    <div className="contLinks">
                        <div className="titArea">Categorias</div>
                        <div className="links">
                            {categoryCarr.length > 0 &&
                                categoryCarr.map((cat) =>
                                    <Link key={cat._id} className="link" to={'/catalogo/' + txtToSlug(cat.titulo)} >
                                        {cat.titulo}
                                    </Link>
                                )
                            }
                        </div>
                    </div>

                    <div className="contLinks">
                        <div className="titArea">Empresa</div>
                        <div className="links">
                            <Link className="link" to="/quem-somos" >
                                Quem somos
                    </Link>
                            <Link className="link" to="/catalogos" >
                                Catálogos
                    </Link>
                        </div>
                    </div>

                    <div className="contLinks">
                        <div className="titArea">Atendimento</div>
                        <div className="links">
                            <Link className="link" to="/quem-somos" >
                                Contato
                             </Link>
                            <Link className="link" to="/" >
                                Whatsapp
                            </Link>
                            <Link className="link" to="/" >
                                Como comprar
                            </Link>
                            <Link className="link" to="/" >
                                Perguntas Frequentes
                            </Link>
                        </div>
                    </div>

                    <div className="infoContato">
                        <div className="fl">
                            <div className="whats">(11) 99876.5432</div>
                            <div className="email">atendimento@terrasraras.com.br</div>
                            <div className="end"><div>Rua Exemplo Endereço, 123<br />Brás - São Paulo - SP</div></div>

                            <div className="pagametos">As melhores condições de pagamento</div>
                        </div>
                    </div>


                    <div className="txtCopy">Todos os direitos reservados a TerrasRaras - cnpj: 34.788.507/0001-73</div>

                </div>
            </div>

        </div>
    )
}
export default Rodape;