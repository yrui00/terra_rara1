import { CATEGORY_DELETE_FAIL, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_SAVE_FAIL, CATEGORY_LIST_REQUEST_SRC, CATEGORY_LIST_SUCCESS_SRC, CATEGORY_LIST_FAIL_SRC, CATEGORY_LIST_REQUEST_CARR, CATEGORY_LIST_SUCCESS_CARR, CATEGORY_LIST_FAIL_CARR, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS } from "../constants/categoryConstants";


function categoryListReducer(state = { category: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, category: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, success:true, category: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function categoryListReducerSrc(state = { categorySrc: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST_SRC:
      return { loading: true, categorySrc: [] };
    case CATEGORY_LIST_SUCCESS_SRC:
      return { loading: false, success:true, categorySrc: action.payload };
    case CATEGORY_LIST_FAIL_SRC:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function categoryListReducerCarr(state = { categoryCarr: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST_CARR:
      return { loading: true, categoryCarr: [] };
    case CATEGORY_LIST_SUCCESS_CARR:
      return { loading: false, categoryCarr: action.payload };
    case CATEGORY_LIST_FAIL_CARR:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
function categorySaveReducer(state = {}, action) {
  switch (action.type) {
    case CATEGORY_SAVE_REQUEST:
      return { loading: true };
    case CATEGORY_SAVE_SUCCESS:
      return { loading: false, success:true, category: action.payload };
    case CATEGORY_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function categoryDeleteReducer(state = { category: {} }, action) {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, category: action.payload, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export {
  categoryListReducer,
  categoryListReducerSrc,
  categoryListReducerCarr,
  categorySaveReducer,
  categoryDeleteReducer
}
