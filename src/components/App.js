import React, { Component } from 'react';
import '../css/style.css';
import Notification from 'react-notify-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './main';
import Register from './register';
import Login from './login';
import Home from './home';
import AddCategory from './addcategories';
import ViewCategory from './viewcategories';
import EditCategory from './editcategories';
import AddRecipe from './addrecipes';
import ViewRecipe from './viewrecipes';
import EditRecipe from './editrecipes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Notification />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addcategories" component={AddCategory} />
            <Route exact path="/viewcategories" component={ViewCategory} />
            <Route exact path="/editcategories/:id" component={EditCategory} />
            <Route exact path="/addrecipes/:id/recipes" component={AddRecipe} />
            <Route exact path="/viewrecipes/:id/recipes" component={ViewRecipe} />
            <Route exact path="/editrecipes/:category_id/recipes/:id" component={EditRecipe} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
