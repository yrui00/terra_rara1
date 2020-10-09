import React from 'react';
import './App.css';
import $ from 'jquery';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../public/images', false, /\.(png|jpe?g|svg)$/));

const openImg = (img) => {
  $('.lightbox').fadeIn(300);
  $('.lightbox .imgLightbox').attr('src',img)
  $('.lightbox input').val('http://www.yurisalinas.xyz'+img)  
}

const closeLightbox = () => {
  $('.lightbox').fadeOut(300); 
}
const copyText = () => {
  $('.lightbox input')[0].select();
  $('.lightbox input')[0].setSelectionRange(0, 99999);
  document.execCommand("copy");


}

function App() {
  return (
    <div className="App">
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
          <img src="" className="imgLightbox" />
          <input type="text" value="" readOnly="readOnly" />
          <div className="btCopy" onClick={() => copyText()} >Copiar Link</div>
          <div className="btX" onClick={() => closeLightbox()} >x</div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
