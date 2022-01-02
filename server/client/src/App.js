import Login from './Components/Login';
import React from 'react'
import Register from './Components/Register';
import {Switch,Route} from "react-router-dom";
import './App.css';
import Profile from './Components/Profile';
import Update from "./Components/Update"



function App() {


  return (
    <div className="App">
           <Switch>
          <div>

          <Route exact path="/"  component={Login}/>
          <Route exact path="/register"  component={Register}/>
          <Route exact path="/profile/:id"  component={Profile}/>
          <Route exact path="/update/:id"  component={Update}/>
          </div>
        </Switch>
    </div>
  );
}

export default App;
