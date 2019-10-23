import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router';

class UsersIndex extends Component {
  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div className="row">
        <div className="twelve columns">
          <h1>Users</h1>
          <hr />
          {users.length ? (
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Mobile number</th>
                  <th>Name</th>
                  <th>Parties</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user) => {
                return (
                  <tr key={'user-' + user.mobileNumber}>
                    <td>
                      <Link to={ '/users/' + user.mobileNumber + '/show' }>{user.mobileNumber}</Link>
                    </td>
                    <td>{user.name}</td>
                    <td>
                      <Link to={ '/parties/all' }>Parties</Link>
                    </td>
                  </tr>
                )}
              )}
              </tbody>
            </table>
          ) : <div>There are currently no users available to display<hr /></div> }
          <Link to={ '/users/new' } className="button button-primary">Create New User</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users.all };
}

export default connect(mapStateToProps, { getUsers })(UsersIndex);
