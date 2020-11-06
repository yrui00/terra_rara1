import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryAdmScreen from './categoryScreen';
import HomeAdmScreen from './homeAdmScreen';
import LoginAdmScreen from './loginscreen';
import ProductAdmScreen from './productsScreen';
import ListImages from './listimages';

function AdminScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        if (!userInfo) {
            props.history.push("/admin/login");
        }
    },[userInfo]);

    return (

        <Switch baseame="/admin" >
            <Route path="/admin/login" component={LoginAdmScreen} />
            <Route path="/admin/categorias" component={CategoryAdmScreen} />
            <Route path="/admin/produtos" component={ProductAdmScreen} />
            <Route path="/admin/listaimagens" component={ListImages} />
            <Route path="/admin/" component={HomeAdmScreen} />
        </Switch>

    )
}
export default AdminScreen;