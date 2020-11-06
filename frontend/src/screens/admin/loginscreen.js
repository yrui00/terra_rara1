import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFunc } from '../../actions/userActions';

function LoginAdmScreen(props) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (userInfo) {
            props.history.push("/admin");
        }
        return () => {
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginFunc(login, password));
    }
    return (

        <div className="pgAdmin">

            <div className="contLogin">
                <div className="contForm" >
                    <form onSubmit={submitHandler} >
                        {loading && <div className="lineForm">loading</div>}
                        {error && <div className="lineForm">{error}</div>}
                        <div className="lineForm">
                            <label htmlFor="login">Login</label>
                            <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className="lineForm">
                            <label htmlFor="password">Senha</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="lineForm">
                            <button type="submit" className="btLogin">LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default LoginAdmScreen;