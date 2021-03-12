import { UPLOAD_IMAGE_COMPLETE, UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from '../constants/productConstants';

const Axios = require('axios');
const { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_SAVE_COMPLETE, CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST_SRC, CATEGORY_LIST_SUCCESS_SRC, CATEGORY_LIST_FAIL_SRC , CATEGORY_LIST_REQUEST_CARR, CATEGORY_LIST_SUCCESS_CARR, CATEGORY_LIST_FAIL_CARR } = require('../constants/categoryConstants');

const registerCategory = (category) => async (dispatch) => {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    if (!category.titulo) {
        dispatch({ type: CATEGORY_SAVE_FAIL, payload: '* Preencha o nome da categoria.' });
    } else {
        if (!category._id) {
            try {
                const { data } = await Axios.post("/api/category/creatcategory", category);
                dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
                dispatch({ type: CATEGORY_SAVE_COMPLETE, payload: '' });
            } catch (error) {
                dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
            }
        } else {
            try {
                const { data } = await Axios.put("/api/category/" + category._id, category);
                dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
                dispatch({ type: CATEGORY_SAVE_COMPLETE, payload: '' });
            } catch (error) {
                dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
            }
        }
    }
}
const delCategory = (catId) => async (dispatch) => {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: catId });
    try {
        const { data } = await Axios.delete("/api/category/" + catId);
        dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
    }
}
const uploadImageCat = (form,header) => async (dispatch) => {
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

const listCategory = (
    slug = '',
    sortOrder = '',
    tipoCategoria = '',
    category = '',
) => async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    try {
        const { data } = await Axios.get(
            '/api/category?id=' +
            category +
            '&slug=' +
            slug +
            '&sortOrder=' +
            sortOrder +
            '&tipoCategoria=' +
            tipoCategoria
        );
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
};

const listCategorySrc = (
    slug = '',
    sortOrder = '',
    tipoCategoria = '',
    category = '',
) => async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST_SRC });
    try {
        const { data } = await Axios.get(
            '/api/category?id=' +
            category +
            '&slug=' +
            slug +
            '&sortOrder=' +
            sortOrder +
            '&tipoCategoria=' +
            tipoCategoria
        );
        dispatch({ type: CATEGORY_LIST_SUCCESS_SRC, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL_SRC, payload: error.message });
    }
};

const listCategoryCarr = (
    slug = '',
    sortOrder = '',
    tipoCategoria = '',
    category = '',
) => async (dispatch) => {
    dispatch({ type: CATEGORY_LIST_REQUEST_CARR });
    try {
        const { data } = await Axios.get(
            '/api/category?id=' +
            category +
            '&slug=' +
            slug +
            '&sortOrder=' +
            sortOrder +
            '&tipoCategoria=' +
            tipoCategoria
        );
        dispatch({ type: CATEGORY_LIST_SUCCESS_CARR, payload: data });
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL_CARR, payload: error.message });
    }
};
export {
    //module.exports = {
    registerCategory,
    listCategory,
    listCategorySrc,
    listCategoryCarr,
    delCategory,
    uploadImageCat,
}