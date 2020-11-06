const Axios = require('axios');
const { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_SAVE_COMPLETE, CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS , CATEGORY_LIST_REQUEST , CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL } = require('../constants/categoryConstants');

const registerCategory = (category) => async (dispatch) => {
    dispatch({type: CATEGORY_SAVE_REQUEST, payload: category });
    if(!category.titulo){
        dispatch({type: CATEGORY_SAVE_FAIL, payload: '* Preencha o nome da categoria.' });
    } else {
        if(!category._id){
            try {
                const {data} = await Axios.post("/api/category/creatcategory" , category );
                dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data });
                dispatch({type: CATEGORY_SAVE_COMPLETE, payload: '' });
            } catch (error) {
                dispatch({type: CATEGORY_SAVE_FAIL, payload: error.message });
            }
        } else {
            try {
                const {data} = await Axios.put("/api/category/"+category._id , category );
                dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data });
                dispatch({type: CATEGORY_SAVE_COMPLETE, payload: '' });
            } catch (error) {
                dispatch({type: CATEGORY_SAVE_FAIL, payload: error.message });
            }
        }
    }
}
const deleteCategory = (catId) => async (dispatch) => {
    dispatch({type: CATEGORY_DELETE_REQUEST, payload:catId });
    try {
        const {data} = await  Axios.delete("/api/category/" + catId );
        dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({type: CATEGORY_DELETE_FAIL, payload: error.message });
    }
}

const listCategory = () => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });
      const { data } = await Axios.get( '/api/category' );
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
  };

module.exports = {
    registerCategory,
    deleteCategory,
    listCategory
}