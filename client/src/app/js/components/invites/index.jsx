import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInvitesForParty } from '../../actions/invites';
import { Link } from 'react-router';

class InvitesIndex extends Component {
  componentWillMount() {
    if(this.props.token) {
        this.props.getInvitesForParty(this.props.token,this.props.party.id);
    }
  }

  render() {
    const { invites } = this.props;
        return (
          <div className="row">
            <div className="twelve columns">
              <h3>Invited guests</h3>
              <hr />
              {invites&&invites.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {invites.map((invite) => {
                    const statusText = {CREATED: '',
                                        INVITED: 'Invite sent',
                                        ACCEPTED: 'Accepted',
                                        REJECTED: 'Rejected'};
                    return (
                      <tr key={'invite-' + invite.id}>
                        <td>{invite.childName}</td>
                        <td>{invite.mobileNumber}</td>
                        <td>{statusText[invite.inviteStatus]}</td>
                      </tr>
                    )}
                  )}
                  </tbody>
                </table>
              ) : <div>There are currently no invited guests<hr /></div> }
            </div>
          </div>
      );
  }
}

function mapStateToProps(state) {
  if(state.users.currentUser){
      return { party: state.parties.party, invites: state.invites.all, token: state.users.currentUser.token};
  } else {
      return { party: state.parties.party, invites: state.invites.all, token: null};
  }
}
export default connect(mapStateToProps, { getInvitesForParty })(InvitesIndex);
