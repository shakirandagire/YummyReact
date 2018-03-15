import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for rendering the main page
 */
class Main extends Component {
  render() {
    return (
      <div className="my_container backgimg">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand title"><Link to="/">Yummy Recipe App</Link></a>

            </div>
          </div>
        </nav>
        <div className="mycontent">
          <h3> Do you love cooking and eating amazing food </h3>
          <h3> And cannot keep track of your favorite recipe</h3>
          <h3> We have got you </h3>
          <h3> View our amazing recipes by simply login</h3>
          <button type="submit" className="btn btn-default formsave login"><Link to="/login"> Login </Link></button>
          <h4>Do not have an account with us:</h4>
          <button type="submit" className="btn btn-default formsave register"><Link to="/register"> Sign Up </Link></button>
        </div>
      </div>

    );
  }
}
export default Main;
