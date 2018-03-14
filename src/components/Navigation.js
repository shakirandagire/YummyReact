import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout';


const Navigation = () => (

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand"><Link to="/main">Yummy Recipes</Link></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse title" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link active"><Link to="/main">Home </Link><span className="sr-only">(current)</span></a>
        <a className="nav-item nav-link"><Link to="/viewcategories"> Categories </Link></a>
        <a className="nav-item nav-link">Pricing</a>
      </div>
      <Logout />
    </div>
  </nav>

);

export default Navigation;
