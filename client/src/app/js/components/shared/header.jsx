import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loginUser, logoutUser } from '../../actions/users';

class Header extends Component {
  handleLogin(event) {
    event.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username.length !== 0 && password.length !== 0) {
      this.props.loginUser({username, password});
    } else {
      alert('Please fill out all fields');
    }
  }

  handleLogoutClick(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const {currentUser} = this.props;

    if (currentUser) {
      return (
        <div className="row">
            <div className="offset-by-five three columns">
              Logged in as <strong>{currentUser.username}</strong>
            </div>
            <div className="two columns">
              ● <Link to="profile">Edit Profile</Link>
            </div>
            <div className="two columns">
             ● <a href="#" onClick={this.handleLogoutClick.bind(this)}>Logout</a>
            </div>
        </div>
      )
    }

    return (
      <div className="row">
       <form onSubmit={this.handleLogin.bind(this)}>
            <div className="one-third column">
              <input type="text" className="u-full-width" placeholder="Username" ref="username" />
            </div>
            <div className="one-third column">
              <input type="password" className="u-full-width" placeholder="Password" ref="password" />
            </div>
            <div className="one-third column">
              <input type="submit" className="u-full-width button-primary" value="Login"/>
            </div>

          <hr />
        </form>
        <div className="twelve columns">
          <Link to="users/new">Create Profile (optional)</Link>
        </div>
      </div>


    );
  }
}

const mapStateToProps = ({users: {currentUser}}) => ({currentUser});

export default connect(mapStateToProps, { loginUser, logoutUser })(Header);
