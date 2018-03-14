import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import axios from 'axios';


class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogin = (event) => {
    const { email, password } = this.state;
    const data = {
      email,
      password,
    };
    event.preventDefault();
    axios
      .post('http://127.0.0.1:5000/api/v1/auth/login', data)
      .then((response) => {
      // notify.show(response.data.message, 'success');
        localStorage.setItem('accessToken', response.data.access_token);
        this.props
          .history
          .push('/viewcategories');
      })
      .catch((error) => {
        if (error.response) {
          notify.show(error.response.data.message, 'success');
        } else if (error.request) {
          notify.show("Request not made", 'success');
        }
      });
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="my_container backgimg">
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
             Email:
              <input type="email" name="email" className="form-control" required onChange={this.handleInputChange} value={email} />
            </div>
            <div className="form-group">
              Password:
              <input type="password" name="password" className="form-control" required onChange={this.handleInputChange} value={password} />
            </div>

            <button type="submit" className="btn btn-danger formsave">Login</button>

            <p>Donot have an account with us:</p><Link to="/register"> Sign Up </Link>
          </form>


        </div>
      </div>
    );
  }
}

export default Login;
