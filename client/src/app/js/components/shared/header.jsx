import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser, logoutUser,updateLanguage } from '../../actions/users';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router';
import Radium from 'radium';
import './styles.css';

import { Translate, Localize,setLocale,I18n} from 'react-redux-i18n';

let RadiumLink = Radium(Link);


class Header extends Component {
  handleLogin(event) {
    event.preventDefault();

    const mobileNumber = this.refs.mobileNumber.value;
    const password = this.refs.password.value;

    if (mobileNumber.length !== 0 && password.length !== 0) {
      this.props.loginUser({mobileNumber, password});
      this.setState({menuOpen: false});
    } else {
      alert(I18n.t("loginPage.error"));
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
    const {currentRoute} = this.props;
    if (currentUser) {
      return (
          <Menu right isOpen={ false }>
            <div className="menu-item" >
              <Translate value="loginPage.logged_in_as" name={currentUser.name}/>
            </div>
            <RadiumLink className="menu-item" to="/profile" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.editProfile" /></RadiumLink>
            <RadiumLink className="menu-item" to="" onClick={this.handleLogoutClick.bind(this)}><Translate value="loginPage.logOut" /></RadiumLink>
            <RadiumLink className="menu-item" to="/parties/my" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.myParties" /></RadiumLink>
            <RadiumLink className="menu-item" to="/integrityPolicy" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.integrityPolicy" /></RadiumLink>
            <div><br/><Translate value="loginPage.language" />:</div>
            <RadiumLink className="menu-item" to={currentRoute} onClick={this.handleLanguageClick.bind(this,"sv")}>Svenska</RadiumLink>
            <RadiumLink className="menu-item" to={currentRoute} onClick={this.handleLanguageClick.bind(this,"en")}>English</RadiumLink>
          </Menu>
      )
    }

    return (
      <div className="row">
        <div className="twelve columns">
            <Menu right isOpen={ false }>
              <form onSubmit={this.handleLogin.bind(this)}>
                <div><Translate value="loginPage.login" />:</div>
                <input type="text" className="u-full-width" placeholder={I18n.t('user.mobileNumber')} ref="mobileNumber" />
                <input type="password" className="u-full-width" placeholder={I18n.t('user.password')} ref="password" />
                <input type="submit" className="u-full-width button-primary" value={I18n.t('loginPage.login')}/>
              </form>

              <RadiumLink className="menu-item" to="/parties/my" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.myParties" /></RadiumLink>
              <RadiumLink to="users/new" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.register" /></RadiumLink>
              <RadiumLink className="menu-item" to="/integrityPolicy" onClick={this.handleMenuClick.bind(this)}><Translate value="loginPage.integrityPolicy" /></RadiumLink>
              <div><br/><Translate value="loginPage.language" />:</div>
              <RadiumLink className="menu-item" to={currentRoute} onClick={this.handleLanguageClick.bind(this,"sv")}>Svenska</RadiumLink>
              <RadiumLink className="menu-item" to={currentRoute} onClick={this.handleLanguageClick.bind(this,"en")}>English</RadiumLink>
              <div><br/><Translate value="loginPage.contact" />:</div>
              <a href="mailto:info@kalas.io">info@kalas.io</a>
            </Menu>

        </div>
      </div>


    );
  }
}


function mapStateToProps(state) {
  if(state.users.currentUser){
      return { currentUser: state.users.currentUser,currentRoute: state.routing.locationBeforeTransitions.pathname};
  } else {
      return { currentUser: null,currentRoute: state.routing.locationBeforeTransitions.pathname};
  }
}

export default connect(mapStateToProps, { loginUser, logoutUser,updateLanguage})(Header);
