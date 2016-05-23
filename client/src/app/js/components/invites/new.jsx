import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createInvite } from '../../actions/invites';

class InvitesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const mobileNumber = this.refs.mobileNumber.value;
    const childName = this.refs.childName.value;


    if (mobileNumber.length !== 0 && childName.length !== 0) {
      const invite = {
        mobileNumber,
        childName
      };

      this.props.createInvite(invite, this.props.party.id, this.props.token);
      this.refs.mobileNumber.value = null;
      this.refs.childName.value = null;    
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Child name" className="u-full-width" ref="childName" />
            <input type="text" placeholder="Mobile number" className="u-full-width" ref="mobileNumber" />
            <input type="submit" className="button button-primary" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.users.currentUser.token, party: state.parties.party};
}

export default connect(mapStateToProps, { createInvite })(InvitesNew);
