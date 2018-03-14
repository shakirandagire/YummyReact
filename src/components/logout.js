import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { withRouter } from 'react-router';

class Logout extends Component {
  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login');
    notify.show("You have logged out successfully", 'success', 4000);
  }
  render() {
    return (
      <button type="submit" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
    );
  }
}

export default withRouter(Logout);
