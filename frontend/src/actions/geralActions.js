
const txtToSlug = (txt) => {
    txt = txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('º','').replace(' ','-');
    return txt;
}
export {
    txtToSlug
}