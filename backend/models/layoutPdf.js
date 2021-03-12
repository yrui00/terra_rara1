module.exports = ({ products, titulo }) => {
    const dt = new Date();
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const postPerPage = 20;
    var pages = [];
    var lastDt = new Date('1993-03-14T03:39:54.055+00:00');
    for (var pg = 1; pg <= Math.ceil(products.length / postPerPage); pg++) {
        const lPost = pg * postPerPage;
        const fPost = lPost - postPerPage;
        const postsPagination = products.slice(fPost, lPost);
        pages.push(postsPagination);
        postsPagination.map((e) => {
            if( new Date(e.created) > lastDt ){
                lastDt = new Date(e.created);
            }
        })
    }
    

    let content = '<!doctype html>\
    <html>\
       <head>\
          <meta charset="utf-8">\
          <title>Catalogo Terras Raras</title>\
       </head>\
       <body style="text-align:center;">';

    for (var a = 0; a < pages.length; a++) {
        content += '<div class="contentCatalogo" style="display: table; width: 595px; height:993px; background: url(\'http://lojaterrasraras.com.br/images/topo_catalogo.png\') no-repeat center top ; margin: 0px auto 40px; padding-top: 100px; padding-bottom: 20px; position: relative; " >\
            <div class="categoriaCatalogo" style="position: absolute; font-family: Arial; font-weight:bold; font-style:italic; font-size: 26px; line-height:30px; height:60px; color: #0E7F80; text-transform: uppercase; top: 50px; left: 43px;  text-align: left; width:365px; line-height:25px; " >'+ titulo +'</div>\
            <div class="dataCatalogo" style="width: 580px; border-bottom: 3px solid #89B5B1; font-family: Arial; font-size: 14px; color: #0b675b; padding-bottom: 5px; margin:10px auto 10px; text-align: right; font-weight: bold; font-style: italic; " > '+ meses[lastDt.getMonth()] +' / '+ lastDt.getFullYear() +'</div>\
            <div style="display:table; width: 580px; margin: 0 auto; font-size:0; " >';

            pages[a].map( function(prod, i) {
                content += '<div key='+prod._id+' style="float:left;  width: 280px; height: 75px; margin:0 5px 15px; border-bottom: 1px solid #89B5B1; " >';
                    prod.imagens.slice(0, 2).map(function (img) {
                        content += '<div style="float:left; width:90px; height:75px; text-align:center;  " >\
                            <div style="vertical-align:middle;display:inline-block; width:0; height:75px; "></div>\
                            <img style="vertical-align:middle;display:inline-block; max-width: 75px; max-height: 73px;" src="https://www.lojaterrasraras.com.br/'+img.filePath+'" alt="'+img.filePath+'" key="'+img.fileName+'" />\
                        </div>';
                    })
                    content += '<div class="info" style=" width:90px; float:right; font-family: Arial; font-size: 10px; text-align: left;">\
                        <div class="cod" style="font-size: 14px; font-weight: bold; font-style: italic; color: #0b675b;" >CÓD: '+ (prod.codigo ? prod.codigo : '') + '</div>\
                        <div>Tamanho: '+ (prod.tamanho ? prod.tamanho : '')+ '</div>\
                        <div>Modelo: '+ (prod.modelo ? prod.modelo : '')+ '</div>\
                        <div>Cor: ' +(prod.cor ? prod.cor : '')+ '</div>\
                    </div>\
                </div>';
            })
        content += '</div> </div>';
    }

    content += '</body> </html>';

    return content;
};