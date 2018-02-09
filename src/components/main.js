import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Register from './register';
import Login from './login';
import Home from './home';

class Main extends Component{
    render(){
        return(
        <div className = "my_container backgimg">
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                <a className="navbar-brand title"><Link to="/main">Yummy Recipe App</Link></a>
                    <ul className="nav navbar-nav title">
                        <li><a><Link to="/main">Home</Link></a></li>
                        <li><a><Link to="/register">Signup</Link></a></li>
                        <li><a><Link to="/login">Login</Link></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="mycontent">
            <h3> Do you love cooking and eating amazing food and cannot keep track of your favorite chef's recipe</h3> 
                <h3> We have got you </h3>
                <h3> View our amazing recipes by simply signing up</h3>
                <button type="submit" className="btn btn-danger formsave"> Sign Up </button>
        </div>
      </div>

        );
    }
}
export default Main;