import React, { Component } from 'react';
import "../css/style.css";
import Notification from 'react-notify-toast';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Main  from './main';
import Register from './register';
import Login from './login';
import Home from './home';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
      <Notification/>
        <Switch>
          <Route exact path='/' component ={Main}>
          </Route>
          <Route exact path='/register' component ={Register}>
          </Route>
          <Route exact path='/home' component ={Home}>
          </Route>
          <Route exact path='/login' component ={Login}>
          </Route>
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
