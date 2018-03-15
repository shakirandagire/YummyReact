import React, { Component } from 'react';
import Notification from 'react-notify-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../css/style.css';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import AddCategory from './AddCategory';
import ViewCategory from './ViewCategory';
import EditCategory from './EditCategory';
import AddRecipe from './AddRecipe';
import ViewRecipe from './ViewRecipe';
import EditRecipe from './EditRecipe';
import PrivateRoute from './PrivateRoute';
import ResetPassword from './ResetPassword';

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
