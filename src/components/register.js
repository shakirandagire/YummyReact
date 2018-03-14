import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notify } from 'react-notify-toast';

class Register extends Component {
    state = {
      email: '',
      password: '',
      security_question: '',
      security_answer: '',
    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleRegister = (event) => {
      const { email, password, security_question, security_answer } = this.state;
      const data = {
        email,
        password,
        security_question,
        security_answer,

      };
      event.preventDefault();
      axios
        .post('http://127.0.0.1:5000/api/v1/auth/register', data)
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
      const { email, password, security_question, security_answer } = this.state;

      return (
        <div className="my_container backgimg" >
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand title" to="/main">Yummy Recipe App</Link>
              </div>
              <ul className="nav navbar-nav title">
                <li><Link to="/main">Home</Link></li>

              </ul>
            </div>
          </nav>

          <div className="mycontent register">

            <p> Donot have an account with us:</p>
            <form onSubmit={this.handleRegister}>

              <div className="form-group">
                Email:
                <input type="email" name="email" className="form-control" required onChange={this.handleInputChange} value={email} />
              </div>
              <div className="form-group">
                Password:
                <input type="password" name="password" className="form-control" required onChange={this.handleInputChange} value={password} />
              </div>
              <div className="form-group">
                Security Question:
                <input type="text" name="security_question" className="form-control" required onChange={this.handleInputChange} value={security_question} />
              </div>
              <div className="form-group">
                Security Answer:
                <input type="text" name="security_answer" className="form-control" required onChange={this.handleInputChange} value={security_answer} />
              </div>

              <button type="submit" className="btn btn-danger formsave" >Signup</button>
            </form>

          </div>
        </div>
      );
    }
}
export default Register;
