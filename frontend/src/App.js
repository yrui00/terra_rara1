import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminScreen from './screens/admin/adminscreen';
import HomeScreen from './screens/homescreen';


function App() {


  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  return (
    <BrowserRouter >
      <div className="App">
        {userInfo && ""}
        <Switch>
          <Route path="/admin" component={AdminScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
