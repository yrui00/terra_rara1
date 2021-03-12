const Axios = require('axios');
const { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,  PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL , UPLOAD_IMAGE_REQUEST , UPLOAD_IMAGE_SUCCESS , UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_COMPLETE, DELETE_IMAGE_SUCCESS , DELETE_IMAGE_REQUEST, DELETE_IMAGE_FAIL } = require('../constants/productConstants');

const registerProduct = (product) => async (dispatch) => {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    if (!product.titulo) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: '* Preencha o nome da categoria.' });
    } else {
        if (!product._id) {
            try {
                const { data } = await Axios.post("/api/product/creatproduct", product);
                dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
            }
        } else {
            try {
                const { data } = await Axios.put("/api/product/" + product._id, product);
                dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
            } catch (error) {
                dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
            }
        }
    }
}
const deleteProduct = (catId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: catId });
    try {
        const { data } = await Axios.delete("/api/product/" + catId);
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
}

const listProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await Axios.get('/api/product');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const uploadImageProduct = (form,header) => async (dispatch) => {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    try {
        const { data } = await Axios.post("/api/upload-image",form,header);
        if(!data.error){
            dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
            dispatch({ type: UPLOAD_IMAGE_COMPLETE, payload: data });   
        } else {
            dispatch({ type: UPLOAD_IMAGE_FAIL, payload: data.error });
        }
    } catch (error) {
        dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error.message });
    }
};
const delImage = (image) => async (dispatch) => {
    dispatch({ type: DELETE_IMAGE_REQUEST });
    try {
        const { data } = await Axios.delete("/api/upload-image/"+image);
        dispatch({ type: DELETE_IMAGE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: DELETE_IMAGE_FAIL, payload: error.message });
    }
};

export  {
//module.exports = {
    registerProduct,
    deleteProduct,
    listProduct,
    uploadImageProduct,
    delImage
}