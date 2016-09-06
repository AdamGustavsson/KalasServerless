import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser,updateLanguage } from '../../actions/users';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';
import './styles.css';

import { Translate, Localize,setLocale } from 'react-redux-i18n';

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

  handleLanguageClick(locale) {

    this.setState({menuOpen: false});
    this.props.updateLanguage(locale);
  }

  handleMenuClick(event) {
    this.setState({menuOpen: false});
  }

  render() {
    const {currentUser} = this.props;

    if (currentUser) {
      return (
          <Menu right isOpen={ false }>
            <div className="menu-item" >
              <Translate value="loginPage.logged_in_as" name={currentUser.name}/>
            </div>
            <RadiumLink className="menu-item" to="profile" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.editProfile" /></RadiumLink>
            <RadiumLink className="menu-item" to="#" onClick={this.handleLogoutClick.bind(this)}><Translate value="loginPage.logOut" /></RadiumLink>
            <a className="menu-item" href="javascript:void(0)" onClick={this.handleLanguageClick.bind(this,"sv")}>Svenska</a>
            <a className="menu-item" href="javascript:void(0)" onClick={this.handleLanguageClick.bind(this,"en")}>English</a>
          </Menu>
      )
    }

    return (
      <div className="row">
        <div className="twelve columns">

            <Menu right isOpen={ false }>
              <form onSubmit={this.handleLogin.bind(this)}>
              <div>Login:</div>
                <input type="text" className="u-full-width" placeholder="Mobile number" ref="mobileNumber" />
                <input type="password" className="u-full-width" placeholder="Password" ref="password" />
                <input type="submit" className="u-full-width button-primary" value="Login"/>
              </form>

              <Link to="users/new" onClick={this.handleMenuClick.bind(this)}>Register account</Link>
            </Menu>

        </div>
      </div>


    );
  }
}

const mapStateToProps = ({users: {currentUser}}) => ({currentUser});

export default connect(mapStateToProps, { loginUser, logoutUser,updateLanguage})(Header);
