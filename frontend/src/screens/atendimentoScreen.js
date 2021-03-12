import React, { useState } from 'react';
import TopoSite from './topoSite.js';
import Carrossel from './carrossel.js';
import Rodape from './rodape.js';
import { Link } from 'react-router-dom';


function AtendimentoScreen() {

    const [classcheck,setClasscheck] = useState('on');
    const toggleClasscheck = () => {
        if(classcheck === ''){
            setClasscheck('on');
        } else {
            setClasscheck('');
        }
    }
    return (
        <div className="content" >
            <TopoSite />
            <Carrossel />

            <div className="titPage">
                <div className="center">
                    <h1>Atendimento</h1>
                </div>
            </div>
            <div className="center ">
                <div className="infosDir at">
                    <div className="hora">
                        <div>Seg a Sex 07:30h-17:30h <br />
                        Sáb 07:30h-16:30h</div>
                    </div>
                    <div className="fone">
                        <div >(11) 99876.5432</div>
                    </div>
                    <div className="email">
                        <div >atendimento@terrasraras.com.br</div>
                    </div>
                    <div className="end">
                        <div >Rua Exemplo Endereço, 123<br />
                        Brás - São Paulo - SP
                        </div>
                    </div>
                </div>
                <div className="txtEsq">
                    <p>Estamos à disposição para questões ou comentários adicionais para ajudar com seus problemas e ouvir suas sugestões e vivências conosco..</p>

                    <p>Você também pode verificar suas dúvidas na seção “<Link to="perguntas-frequentes" ><strong>Perguntas Frequentes</strong></Link>” e ainda na “<Link to="/como-funciona" ><strong>Como funciona?</strong></Link>” .</p>

                    <div className="contForm">
                        <div className="campo meio">
                            <label>Nome completo:</label>
                            <input type="text" name="nome" />
                        </div>
                        <div className="campo meio">
                            <label>Telefone:</label>
                            <input type="text" name="telefone" />
                        </div>
                        <div className="campo ">
                            <label>Email:</label>
                            <input type="text" name="email" />
                        </div>
                        <div className="campo ">
                            <label>Mensagem:</label>
                            <textarea name="mensagem"></textarea>
                        </div>
                        <div className="checkNovidades" onClick={(e) => toggleClasscheck()} >
                            <div className={"check "+classcheck}></div>
                            Quero receber novidades da Terras Raras por e-mail.
                        </div>

                        <button className="btEnviar"></button>
                    </div>

                </div>
            </div>
            <div className="whatsAtendimento"></div>
            <Rodape />
        </div>
    )
}
export default AtendimentoScreen;