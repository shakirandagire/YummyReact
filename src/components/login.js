import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Main  from './main';
import Home from './home';
import axios from 'axios';
import {notify} from 'react-notify-toast';

class Login extends Component{
  state = {
    email: '',
    password: ''
  }

  handleInputChange = (event)=>{
    const {name, value} = event.target;
    this.setState({[name]:value});
  }

  handleLogin = (event) => {
    const {email, password} = this.state
    let data = {
      email,
      password
    }
    event.preventDefault();
    axios
    .post('http://127.0.0.1:5000/api/v1/auth/login',data)
    .then(response =>{
      notify.show(response.data.message, 'success', 4000);
      localStorage.setItem('accessToken', response.data.access_token);
      this.props
      .history
      .push('/viewcategories');
     
      
    })
    .catch(error => {
        if (error.response)
        {
          alert(error.response.data.message)
        }
        else if(error.request){
          alert("Request not made")

        }
      });
  }
    render(){
      const {email, password} = this.state;
        return(
            <div className = "my_container backgimg">
            <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand title">Yummy Recipe App</a>
            </div>
            <ul className="nav navbar-nav title">
            <li><a>Home</a></li>
          </ul>
          </div>
      </nav>
        
      <div className="mycontent register">

          <p> Have an account with us:</p> 
        <form onSubmit={this.handleLogin}>
        <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" className="form-control" required onChange={this.handleInputChange} value={email} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name = "password" className="form-control" required onChange={this.handleInputChange} value={password}/>
          </div>
      
        <button type="submit" className="btn btn-danger formsave">Login</button>

        <p>Donot have an account with us:</p><Link to='/register'> Sign Up </Link>
        </form>
    
            
        </div>
       </div>  
        );
    }
}

export default Login;