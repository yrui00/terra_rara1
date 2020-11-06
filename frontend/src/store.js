import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer } from './reducers/userReducers';
import { categoryDeleteReducer, categoryListReducer, categorySaveReducer } from './reducers/categoryReducers';
import { productDeleteReducer, productListReducer, productSaveReducer, uploadImageReducer } from './reducers/productReducers';


const userInfo = Cookie.getJSON('userInfo') || null;


const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  
  uploadImage: uploadImageReducer,
  productList: productListReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,

  categoryList: categoryListReducer,
  categorySave: categorySaveReducer,
  categoryDelete: categoryDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
