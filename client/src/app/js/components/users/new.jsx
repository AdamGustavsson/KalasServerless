import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import { Link } from 'react-router';
import { Translate, I18n } from 'react-redux-i18n';


class UsersNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.name.value;
    const mobileNumber = this.refs.mobileNumber.value;
    const password = this.refs.password.value;
    const password2 = this.refs.password2.value;

    if (name.length !== 0 && mobileNumber.length !== 0 && password.length !== 0 && password2.length !== 0 && password==password2) {
      const user = {
        name,
        mobileNumber,
        password
      };

      this.props.createUser(user);
    } else {
      alert(I18n.t('registerPage.error'));
    }
  }



  render() {
    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1><Translate value="registerPage.register" /></h1>
            <hr />
            <h5><Translate value="registerPage.registerInfo" /></h5>
            <Link to={ 'parties/new' } className="button button-primary"><Translate value="myPartiesPage.create" /></Link>
            <div><Translate value="user.name" />:</div>
            <input type="text" placeholder={I18n.t('user.name')} className="u-full-width" ref="name" />
            <div><Translate value="user.mobileNumber" />:</div>
            <input type="text" placeholder={I18n.t('user.mobileNumber')} className="u-full-width" ref="mobileNumber" />
            <div><Translate value="registerPage.chosePassword" />:</div>
            <input type="password" placeholder={I18n.t('user.password')} className="u-full-width" ref="password" />
            <div><Translate value="registerPage.verifyPassword" />:</div>
            <input type="password" placeholder={I18n.t('user.password')} className="u-full-width" ref="password2" />
            <input type="submit" className="button button-primary" value={I18n.t('registerPage.register')}/>
            <Link to="/" className="u-pull-right button"><Translate value="general.cancel" /></Link>
          </form>

        </div>
      </div>
    );
  }
}



export default connect(null, { createUser })(UsersNew);
