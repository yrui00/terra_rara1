import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';



function ListImages() {

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
        $(obj).parent().find('input')[0].select();
        $(obj).parent().find('input')[0].setSelectionRange(0, 99999);
        document.execCommand("copy");
    }

    const searchImage = (str) => {
        $('.contentImgs .img .names').not('.noSrc').find('span').each(function () {
            $(this).html($(this).text());
        })
        if (str.length > 0) {
            $('.contentImgs .img .names').not('.noSrc').find('span').each(function () {
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
            $('.contentImgs .topSearch').show();
            $('.contentImgs .topSearch .numResults span').html($('.contentImgs .img:visible').length);
            $('.contentImgs .topSearch .txtResults span').html(str);
        } else {
            $('.contentImgs .img').show();
            $('.contentImgs .topSearch').hide();
        }
    }

    const [arImages, setImage] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/jsonimgs");
            setImage(data.images);
        }
        fetchData();
    }, [])

    /*function importAll(r) {
        return r.keys().map(r);
    }
    const images = importAll(require.context('../images_upload', false, /\.(png|jpe?g|svg)$/));
    images.map((img) =>{
        console.log(img.split('/')[3]);
    });*/



    var ind = 1;
      
    return (
        <div>
            <header className="topo">
                <div className="center">
                    Lista de <strong>imagens</strong> - Terras<strong>Raras</strong>
                    <div className="contPesquisa">
                        <input type="text" onChange={(e) => searchImage(e.target.value)} placeholder="Pesquisar" />

                    </div>
                </div>

            </header>
            <div className="contentImgs">
                <div className="topSearch">
                    <div className="numResults">Resultados: <span className="num"></span></div>
                    <div className="txtResults">Pesquisando por: <span className="txt">ziper</span></div>
                </div>
                {arImages.map((img) => 
                    
                    <div key={img.url} className="img"  >
                        <div className="numId">{frmNum(ind++)}</div>
                        <div className="contImg"><img key={img.url} src={"/tb_images/" + img.url + "?width=50&height=50"} alt="" /></div>
                        <div className="names" >
                            <span>{img.url.split(/\.jpe?g|\.png/)[0]}</span>
                            <input type="text" value={"https://www.lojaterrasraras.com.br/images/" + img.url} readOnly="readOnly" />
                        </div>
                        <div className="btCopy" onClick={(e) => copyText(e.target)} ></div>
                        <div className="btShow" onClick={() => openImg(img)} ></div>
                    </div>
                )}
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
    )
}
export default ListImages;