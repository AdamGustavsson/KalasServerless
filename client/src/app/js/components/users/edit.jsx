import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser, logoutUser} from '../../actions/users';
import { Link } from 'react-router';

class UsersEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    if (confirm('Do you want to delete this user?')) {
      this.props.deleteUser(this.props.user.token)
        .then(this.props.logoutUser)
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.name.value;
    const password = this.refs.password.value;

    if (name.length !== 0 && password.length !== 0) {
      const user = {
        name,
        password,
        token: this.props.user.token
      };

      this.props.updateUser(user);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    const {user} = this.props;

    if (!user) return null;

    return (
      <div className="row">
        <div className="twelve columns">
          <h1>Edit Profile</h1>
          <hr />
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Name" className="u-full-width" ref="name" defaultValue={user.name}/>
            <input type="password" placeholder="Password" className="u-full-width" ref="password" />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({users: {currentUser}}) => ({user: currentUser});

export default connect(mapStateToProps, {updateUser, deleteUser, logoutUser})(UsersEdit);
