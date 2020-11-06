import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from '../constants/userConstants';

const loginFunc = (login,password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {login , password} });
    try {
        const {data} = await  Axios.post("/api/users/login" , {login , password} );
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo' , JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT });
  }

export {
    loginFunc,
    logout
}