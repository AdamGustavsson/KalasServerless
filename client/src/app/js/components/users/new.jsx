import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import { Link } from 'react-router';

class UsersNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const name = this.refs.name.value;
    const mobileNumber = this.refs.mobileNumber.value;
    const password = this.refs.password.value;

    if (name.length !== 0 && mobileNumber.length !== 0 && password.length !== 0) {
      const user = {
        name,
        mobileNumber,
        password
      };

      this.props.createUser(user);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Register</h1>
            <hr />
            <input type="text" placeholder="Name" className="u-full-width" ref="name" />
            <input type="text" placeholder="Mobile Number" className="u-full-width" ref="mobileNumber" />
            <input type="password" placeholder="Password" className="u-full-width" ref="password" />
            <input type="submit" className="button button-primary" value="Register"/>
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { createUser })(UsersNew);
