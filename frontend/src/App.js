import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminScreen from './screens/admin/adminscreen';
import HomeScreen from './screens/homeScreen';
import QuemsomosScreen from './screens/quemsomosScreen';
import AtendimentoScreen from './screens/atendimentoScreen';
import CatalogoScreen from './screens/catalogoScreen';
import CatalogosScreen from './screens/catalogosScreen';
import layoutScreen from './screens/layoutScreen';
import CatalogoPrint from './screens/catalogoPrint';


function App() {


  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;

  return (
    <BrowserRouter >
      <div className="App">
        {userInfo && ""}
        <Switch>
          <Route path="/admin" component={AdminScreen} />
          <Route path="/layout"  component={layoutScreen} />
          <Route path="/catalogos" component={CatalogosScreen} />
          <Route path="/catalogo/*" component={CatalogoScreen}  />
          <Route path="/quem-somos" component={QuemsomosScreen}  />
          <Route path="/atendimento" component={AtendimentoScreen}  />
          <Route path="/imprimir_catalogo" component={CatalogoPrint}  />
          <Route path="/" exact={true} component={HomeScreen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
