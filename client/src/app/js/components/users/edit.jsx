import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, logoutUser} from '../../actions/users';
import { Link } from 'react-router';
import { Translate,I18n} from 'react-redux-i18n';

class UsersEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };


  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.name.value;
    const password = this.refs.password.value;
    const password2 = this.refs.password2.value

    if (name.length !== 0 && password.length !== 0 && password2.length !== 0 && password==password2) {
      const user = {
        name,
        password,
        token: this.props.user.token
      };

      this.props.updateUser(user);
    } else {
      alert(I18n.t('registerPage.error'));
    }
  }

  render() {
    const {user} = this.props;

    if (!user) return null;

    return (
      <div className="row">
        <div className="twelve columns">
          <h1><Translate value="editAccountPage.editAcount" /></h1>
          <hr />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div><Translate value="user.name" />:</div>
            <input type="text" placeholder={I18n.t('user.name')} className="u-full-width" ref="name" defaultValue={user.name}/>
            <div><Translate value="editAccountPage.newPassword" />:</div>
            <input type="password" placeholder={I18n.t('user.password')} className="u-full-width" ref="password" />
            <div><Translate value="editAccountPage.newPassword_verify" />:</div>
            <input type="password" placeholder={I18n.t('user.password')} className="u-full-width" ref="password2" />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({users: {currentUser}}) => ({user: currentUser});

export default connect(mapStateToProps, {updateUser, logoutUser})(UsersEdit);
