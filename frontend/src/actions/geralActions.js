import { saveAs } from 'file-saver';
import Axios from 'axios';
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const txtToSlug = (txt) => {
    txt = txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/º/g,'').replace(/ /g,'-');
    return txt;
}
const getStyle = (el,prop) => {
    return window.getComputedStyle(el,null).getPropertyValue(prop)
}
const downloadCatalogo = (obj, tit) => {
    
    Axios.post('/api/create-pdf', { products:obj, titulo:tit }).then(() => {
        Axios.get('/api/fetch-pdf', { responseType: 'blob' }).then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'catalogo.pdf');
        })
    })
}

const getProducts = (obj1, filter) => {
    let obj = [];
    if (filter && filter.idCat) {
        obj1.map((i, j) => {
            let add = false;
            i.categoria.map((a) => {
                if (a._id === filter.idCat) {
                    add = true;
                } else {
                    a.agrupador.map((b) => {
                        if (b === filter.idCat) {
                            add = true;
                        }
                    })
                }
            })

            if (add) {
                obj.push(i);
            }
        });

    } else {
        obj = obj1;
    }
    return obj;
}


//module.exports = {
export {    
    txtToSlug,
    getStyle,
    downloadCatalogo,
    getProducts,
    meses
}