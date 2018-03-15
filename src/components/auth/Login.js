import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { notify } from 'react-notify-toast';
import axios from 'axios';
import { BASE_URL } from '../../../src/constants';

/**
 * Component for logging in users
 */
class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Function to handle the logging in of users
  handleLogin = (event) => {
    const { email, password } = this.state;
    const data = {
      email,
      password,
    };
    event.preventDefault();
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, data)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.access_token);
        this.props
          .history
          .push('/view-categories');
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
              <Link className="navbar-brand title" to="/">Yummy Recipe App</Link>
            </div>
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
            <Link to="/reset-password"> Forgot password </Link>
            <div>
              <button type="submit" className="btn btn-danger formsave">Login</button>
            </div>

            <p>Donot have an account with us:</p><Link to="/register"> Sign Up     </Link>

          </form>
        </div>
      </div>
    );
  }
}

export default Login;
