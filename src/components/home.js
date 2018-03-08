import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Home extends Component{
    render(){
        return(
        <div className ="my_container backgimg">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand title" href="#">Yummy Recipe App</a>
            </div>
            <ul className="nav navbar-nav title">
              <li><a>Home</a></li>
              <li><a>Recipes</a></li>
              <li><a>Categories</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right title">
              <li><a><span className="glyphicon glyphicon-user"></span> Hallo</a></li>
              <li><a>Logout</a></li>
            </ul>
            </div>
        </nav>
        
      <div className = "mycontent">
      
        <h3> Welcome to Yummy Recipes by Shakira</h3>

        <h3> Add Recipe Categories for your favourite foods</h3>

        <button className="btn btn-default">
          <Link to='/addcategories'>
           Create Category
         </Link>
        </button>
               
      </div>     
     </div>

           
        );
    }
}
export default Home;