import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MenuAdmin from './menuAdmin';
import Pagination from '@material-ui/lab/Pagination';
import { listProduct } from '../../actions/productActions';



function ListImages(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (!userInfo) {
            props.history.push("/admin/login");
        }
    }, [userInfo]);

    const openImg = (img) => {
        $('.lightbox').fadeIn(300);
        var nameImg = img.url.split('/');
        $('.lightbox .imgLightbox').attr({ src: '/images/' + img.url, alt: nameImg[nameImg.length - 1] });
        $('.lightbox input').val('https://www.lojaterrasraras.com.br/images/' + img.url);
        $('.lightbox .titImage').html(img.url.split(/\.jpe?g|\.png/)[0]);
    }

    const closeLightbox = () => {
        $('.lightbox').fadeOut(300);
        $('.lightbox .imgLightbox').attr({ src: '', alt: '' });
    }

    const frmNum = (n) => {
        var txtN = '';
        for (var i = n.toString().length; i < 4; i++) {
            txtN += '0';
        }
        txtN += n;
        return txtN;
    }

    const copyText = (obj) => {
        $(obj).parent().parent().find('input')[0].select();
        $(obj).parent().parent().find('input')[0].setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    const searchImage = (str) => {
        $('.contentImgs .names').not('.noSrc').find('span').each(function () {
            $(this).html($(this).text());
        })
        if (str.length > 0) {
            $('.contentImgs .names').not('.noSrc').find('span').each(function () {
                var txt = $(this).text().toLowerCase();
                if (txt.match(str)) {
                    var arTxt = txt.split(str);
                    var tx = '';
                    for (var i = 0; i < arTxt.length; i++) {
                        tx += arTxt[i];
                        if (i !== arTxt.length - 1) {
                            tx += '<span class="mark">' + str + '</span>';
                        }
                    }
                    $(this).html(tx);
                    $(this).parent().parent().show();
                } else {
                    $(this).parent().parent().hide();
                }
            })
            $('.topSearch .numResults span').html($('.contentImgs .imagens:visible').length);
            $('.topSearch .txtResults span').html(str);
        } else {
            $('.contentImgs .imagens').show();
            $('.topSearch .numResults span').html('');
            $('.topSearch .txtResults span').html('');
        }
    }
    /* 
        const [arImages, setImage] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                const { data } = await axios.get("/api/jsonimgs");
                setImage(data.images);
            }
            fetchData();
        }, []) */


    const productList = useSelector((state) => state.productList);
    const { product, success } = productList;
    const [arImages, setImage] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
    }, []);
    useEffect(() => {
        let ar = [];
        product.map((p) => {
            p.imagens.map((i) => {
                i.titulo = p.titulo;
                ar.push(i);
            })
        })
        setImage(ar);
    }, [success]);
    
    ///// paginaçao
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(20);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const postsPagination = arImages.slice(indexOfFirstPost, indexOfLastPost);

    const evtPaginate = (obj, num) => {
        setCurrentPage(num);
    }



    var ind = 1;

    return (
        <div>
            <div className="pgAdmin">
                <MenuAdmin />
                <div className="contentAdmin">
                    <div className="topAdmin">
                        <h1 >
                            Lista de Imagens
                        </h1>
                        <div className="topSearch">
                            <div className="contPesquisa">
                                <input type="text" onChange={(e) => searchImage(e.target.value)} placeholder="Pesquisar" />
                            </div>
                            <div className="numResults">Resultados: <span className="num"></span></div>
                            <div className="txtResults">Pesquisando por: <span className="txt"></span></div>
                        </div>
                    </div>

                    <div className="contentImgs">

                        <ul className="itensAdm">
                            {postsPagination.map((img) =>

                                <li key={img.fileName} className="imagens"  >
                                    <div className="imgId">
                                        <div className="numId">{frmNum(ind++)}</div>
                                        <div className="contImg"><img key={img.fileName} src={"/tb_images/" + img.fileName + "?width=50&height=50"} alt="" /></div>
                                    </div>
                                    <div className="names" >
                                        <span>{img.titulo}</span>
                                        <input type="text" value={"https://www.lojaterrasraras.com.br/images/" + img.fileName} readOnly="readOnly" />
                                    </div>
                                    <div className="bts">
                                        <div className="btCopy" onClick={(e) => copyText(e.target)} ></div>
                                        <div className="btShow" onClick={() => openImg(img)} ></div>
                                    </div>

                                </li>
                            )}
                        </ul>
                        {Math.ceil(arImages.length / postPerPage) > 1 &&
                            <div className="paginationAdm">
                                <Pagination
                                    count={Math.ceil(arImages.length / postPerPage)}
                                    page={currentPage}
                                    onChange={evtPaginate}
                                />
                            </div>
                        }

                    </div>

                    <div className="lightbox" onClick={() => closeLightbox()} >
                        <div className="boxImg" onClick={(e) => e.stopPropagation()} >
                            <div className="titImage"></div>
                            <img src="" className="imgLightbox" alt="" />
                            <div className="contLink"><input type="text" value="" readOnly="readOnly" /></div>
                            <div className="btCopy" onClick={(e) => copyText(e.target)} ></div>
                            <div className="btX" onClick={() => closeLightbox()} ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ListImages;