import React from 'react';
import TopoSite from './topoSite.js';
import Carrossel from './carrossel.js';
import Rodape from './rodape.js';
import Destaques from './destaques.js';
import { Link } from 'react-router-dom';


function QuemsomosScreen() {

    return (
        <div className="content" >
            <TopoSite />
            <Carrossel />

            <div className="titPage">
                <div className="center">
                    <h1>Quem Somos</h1>
                </div>
            </div>
            <div className="center ">
                <div className="infosDir">

                    <Link to={"catalogo"} className="btCatalogo" >
                        <span className="tx1" >CATÁLOGO</span>
                        <span className="tx2" >COMPLETO</span>
                        <span className="data" ><strong>Versão atualizada:</strong> Janeiro/2021 </span>
                    </Link>
                    <br />
                    <div className="boxBaixe">
                        <div>Baixe o catálogo e <br /> realize sua encomenda!</div>
                    </div>
                    <br />
                    <Link to={"catalogo"} className="btCatalogo" >
                        <span className="tx1" >VEJA TAMBÉM OS CATÁLOGOS POR</span>
                        <span className="tx2" >CATEGORIA</span>
                        <span className="data" ><strong>Versão atualizada:</strong> Janeiro/2021 </span>
                    </Link>
                </div>
                <div className="txtEsq">
                    <p>TerrasRaras surge em 1998 da necessidade de transmitir leveza e confiança a cada experiência de compra e atendimento de nossos clientes lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam.</p>

                    <p>Prezamos a ótima qualidade de nossos produtos para que nossos clientes obtenham ótimos retornos nummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                    <p>Almejamos criar um sentimento de sensação superlativa e o frescor da serendipidade. Proporcionando mais do que uma simples compra, uma vivência isi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>

                    <p><strong>Visão</strong></p>
                    <p>Todos os dias verificamos novas formas de obtermelhor performance e qualidade para o cliente, essa é nossa meta e desafio diário. Por isso, seguimos altos padrões de conduta profissional e respeitamos uns aos outros, tratando todos com cordialidade e respeito. Disciplina, criatividade e tecnologia são fundamentais para alcançar nossos objetivos. Duis autem vel eum iriure dolor in hendrerit in vulputate velit ess.</p>
                    <p><strong>Missão</strong></p>
                    <p>Nossa missão é sempre estar investindo na tecnologia e importação de novidades e ser reconhecida como a melhor opção pelos clientes, colaboradores, e revendedores pela qualidade de nossos produtos. Accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam.</p>
                </div>
            </div>

            <Destaques tit={["Nossos ", <span>Destaques</span>]} />

            <Rodape />
        </div>
    )
}
export default QuemsomosScreen;