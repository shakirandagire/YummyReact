import React, { Component } from 'react';
import Notification from 'react-notify-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../css/style.css';
import Main from '../../src/components/other/Main';
import Register from '../../src/components/auth/Register';
import Login from '../../src/components/auth/Login';
import AddCategory from '../../src/components/categories/AddCategory';
import ViewCategory from '../../src/components/categories/ViewCategory';
import EditCategory from '../../src/components/categories/EditCategory';
import AddRecipe from '../../src/components/recipes/AddRecipe';
import ViewRecipe from '../../src/components/recipes/ViewRecipe';
import EditRecipe from '../../src/components/recipes/EditRecipe';
import PrivateRoute from '../../src/components/other/PrivateRoute';
import ResetPassword from '../../src/components/auth/ResetPassword';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Notification />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <PrivateRoute exact path="/add-categories" component={AddCategory} />
            <PrivateRoute exact path="/view-categories" component={ViewCategory} />
            <PrivateRoute exact path="/edit-categories/:id" component={EditCategory} />
            <PrivateRoute exact path="/add-recipes/:id/recipes" component={AddRecipe} />
            <PrivateRoute exact path="/view-recipes/:id/recipes" component={ViewRecipe} />
            <PrivateRoute exact path="/edit-recipes/:category_id/recipes/:id" component={EditRecipe} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
