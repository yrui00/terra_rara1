import React from 'react';
import $ from 'jquery';
import path from 'path';
const express = require('express');


  
function homeScreen() {
    const importAll = (r) => {
        return r.keys().map(r);
      }
      //path.join('public', 'images')
      
      //const images = importAll(require.context('public/images', false, /\.(png|jpe?g|svg)$/));
      console.log(express);
      
      const images = importAll(require.context(path.join( 'public', 'images'), false, /\.(png|jpe?g|svg)$/));
      
      const openImg = (img) => {
        $('.lightbox').fadeIn(300);
        var nameImg = img.split('/');
        $('.lightbox .imgLightbox').attr({src:img , alt:nameImg[nameImg.length-1] });
        $('.lightbox input').val('https://www.yurisalinas.xyz'+img) ; 
      }
      
      const closeLightbox = () => {
        $('.lightbox').fadeOut(300); 
        $('.lightbox .imgLightbox').attr({src:'' , alt:'' });
      }   
      const copyText = () => {
        $('.lightbox input')[0].select();
        $('.lightbox input')[0].setSelectionRange(0, 99999);
        document.execCommand("copy");
      }
    
    return (
        <>
        <header className="topo">
            IMAGENS TERRA RARA
        </header>
        <div className="contentImgs">
            {images.map((img) =>
            <div key={img} className="img" onClick={() => openImg(img)} >
                <img key={img} src={img} alt=""  />
            </div>
            )}
            
        </div>

        <div className="lightbox" onClick={() => closeLightbox()} >
            <div className="boxImg" onClick={(e) => e.stopPropagation()} >
            <img src="" className="imgLightbox" alt="" />
            <input type="text" value="" readOnly="readOnly" />
            <div className="btCopy" onClick={() => copyText()} >Copiar Link</div>
            <div className="btX" onClick={() => closeLightbox()} >x</div>
            </div>
        </div>
        </>
    )
}
export default homeScreen;