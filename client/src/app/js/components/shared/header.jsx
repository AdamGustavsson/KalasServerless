import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../../actions/users';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';
import './styles.css';
let RadiumLink = Radium(Link);


class Header extends Component {
  handleLogin(event) {
    event.preventDefault();

    const mobileNumber = this.refs.mobileNumber.value;
    const password = this.refs.password.value;

    if (mobileNumber.length !== 0 && password.length !== 0) {
      this.props.loginUser({mobileNumber, password});
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
          <div className="twelve columns">
              <Menu  right >
                <div className="menu-item" >Logged in as <strong>{currentUser.name}</strong></div>
                <RadiumLink className="menu-item" to="profile">Edit Profile</RadiumLink>
                <a className="menu-item" href="#" onClick={this.handleLogoutClick.bind(this)}>Logout</a>
              </Menu>
          </div>
        </div>

      )
    }

    return (
      <div className="row">
        <div className="twelve columns">

                <Menu right >
                  <form onSubmit={this.handleLogin.bind(this)}>
                    <input type="text" className="u-full-width" placeholder="Mobile number" ref="mobileNumber" />
                    <input type="password" className="u-full-width" placeholder="Password" ref="password" />
                    <input type="submit" className="u-full-width button-primary" value="Login"/>
                  </form>
                  <Link to="users/new">Create Profile (optional)</Link>
                </Menu>


        </div>
      </div>


    );
  }
}

const mapStateToProps = ({users: {currentUser}}) => ({currentUser});

export default connect(mapStateToProps, { loginUser, logoutUser })(Header);
