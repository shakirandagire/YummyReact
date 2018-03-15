import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';

import { BASE_URL } from '../../../src/constants';
/**
 * Component for registering the users of the application
 */
class ResetPassword extends Component {
    state = {
      email: '',
      new_password: '',
      security_question: '',
      security_answer: '',
    }
  // Method for handling the input change
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }
    // Method for handling the registartion of users
    handleResetPassword = (event) => {
      const { email, new_password, security_question, security_answer } = this.state;
      const data = {
        email,
        new_password,
        security_question,
        security_answer,

      };
      event.preventDefault();
      axios
        .post(`${BASE_URL}/api/v1/auth/change_password`, data)
        .then((response) => {
          notify.show(response.data.message, 'success', 4000);
          this.props
            .history
            .push('/login');
        })
        .catch((error) => {
          if (error.response) {
            notify.show(error.response.data.message, 'success');
          } else if (error.request) {
            notify.show("Request not made");
          }
        });
    }

    render() {
      const { email, new_password, security_question, security_answer } = this.state;

      return (
        <div className="my_container backgimg" >
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand title" to="/">Yummy Recipe App</Link>
              </div>
            </div>
          </nav>

          <div className="mycontent register">

            <p> Forgot your password:</p>
            <form onSubmit={this.handleResetPassword}>

              <div className="form-group">
                Email:
                <input type="email" name="email" className="form-control" required onChange={this.handleInputChange} value={email} />
              </div>
              <div className="form-group">
                New Password:
                <input type="password" name="new_password" className="form-control" required onChange={this.handleInputChange} value={new_password} />
              </div>
              <div className="form-group">
                Security Question:
                <input type="text" name="security_question" className="form-control" required onChange={this.handleInputChange} value={security_question} />
              </div>
              <div className="form-group">
                Security Answer:
                <input type="text" name="security_answer" className="form-control" required onChange={this.handleInputChange} value={security_answer} />
              </div>

              <button type="submit" className="btn btn-danger formsave" >Reset password</button>

            </form>

          </div>
        </div>
      );
    }
}
export default ResetPassword;
