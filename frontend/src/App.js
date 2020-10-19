import React  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AdminScreen from './screens/adminscreen';
import HomeScreen from './screens/homescreen';
import ListImages from './screens/listimages';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/listaimagens" component={ListImages} />
      <Route path="/admin" component={AdminScreen} />
      <Route path="/" exact={true}  component={HomeScreen} />
      
    </div>
    </BrowserRouter>
  );
}

export default App;
