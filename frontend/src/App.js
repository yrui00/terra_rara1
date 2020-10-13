import React from 'react';
import './App.css';
import $ from 'jquery';

const importAll = (r) => {
  return r.keys().map(r);
}

const images = importAll(require.context('../src/images_upload', false, /\.(png|jpe?g|svg)$/));

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

const frmNum = (n) => {
  var txtN = '';
  for(var i = n.toString().length; i< 4; i++) {
    txtN+= '0';
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
  $('.contentImgs .img .names').not('.noSrc').find('span').each(function(){
    $(this).html($(this).text());
  })
  if(str.length > 0){
    $('.contentImgs .img .names').not('.noSrc').find('span').each(function(){
      var txt = $(this).text().toLowerCase();
      if(txt.match(str)){
        var arTxt = txt.split(str);
        var tx = '';
        for(var i =0; i< arTxt.length; i++){
          tx += arTxt[i];
          if( i != arTxt.length-1 ) {
            tx += '<span class="mark">'+str+'</span>';
          }
        }
        $(this).html( tx );
        $(this).parent().parent().show();
      } else {
        $(this).parent().parent().hide();
      }
    })
    $('.contentImgs .topSearch').show();
    $('.contentImgs .topSearch .numResults span').html( $('.contentImgs .img:visible').length );
    $('.contentImgs .topSearch .txtResults span').html( str );
  } else {
    $('.contentImgs .img').show();
    $('.contentImgs .topSearch').hide();
  }
}


function App() {

  const nameImg = '';
  
  return (
    <div className="App">
      
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
        {images.map((img,ind) => 
          <div key={img} className="img"  >
            <div className="numId">{ frmNum(ind+1) }</div>
            <div className="contImg"><img key={img} src={img} alt=""  /></div>
            <div className="names" >
             
              {  //nameImg = img.split('/').map((i) => 
              <span>i</span>
               }
              
              <input type="text" value={img} readOnly="readOnly" />
            </div>
            <div className="btCopy" onClick={(e) => copyText(e.target)} ></div>
            <div className="btShow" onClick={() => openImg(img)} ></div>
          </div>
        )}
      </div>
      
      <div className="lightbox" onClick={() => closeLightbox()} >
        <div className="boxImg" onClick={(e) => e.stopPropagation()} >
          <img src="" className="imgLightbox" alt="" />
          <input type="text" value="" readOnly="readOnly" />
          <div className="btCopy" onClick={(e) => copyText(e.target)} >Copiar Link</div>
          <div className="btX" onClick={() => closeLightbox()} >x</div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
