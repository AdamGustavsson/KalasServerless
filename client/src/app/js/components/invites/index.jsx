import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInvitesForParty } from '../../actions/invites';
import { Link } from 'react-router';
import { Translate,I18n} from 'react-redux-i18n';

class InvitesIndex extends Component {
  componentWillMount() {
    if(this.props.token) {
        this.props.getInvitesForParty(this.props.token,this.props.party.id);
    } else {
      this.props.invites = [];
    }

  }

  render() {
    const { invites } = this.props;
    const statusOrder = {ACCEPTED: 1,
                        REJECTED: 2,
                        CREATED: 3,
                        INVITED: 4};

    const statusText = {CREATED: '',
                        INVITED: I18n.t('createPartyPage.inviteSent'),
                        ACCEPTED: I18n.t('createPartyPage.accepted'),
                        REJECTED: I18n.t('createPartyPage.rejected')};
    var lastStatus = 0;
    invites.sort((a, b) => {
      return statusOrder[a.inviteStatus] - statusOrder[b.inviteStatus];
    })
        return (
          <div className="row">
            <div className="twelve columns">
              <h3><Translate value="createPartyPage.invitedGuests" /></h3>
              <hr />
              {invites&&invites.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th><Translate value="createPartyPage.guestName" /></th>
                      <th><Translate value="createPartyPage.inviteStatus" /></th>
                      <th><Translate value="createPartyPage.mobileNumber" /></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    invites.map((invite) => {
                    return (
                      <tr key={'invite-' + invite.id}>
                        <td>{invite.childName}</td>
                        <td>{statusText[invite.inviteStatus]}</td>
                        <td>{invite.mobileNumber}</td>
                      </tr>
                    )}
                  )}
                  </tbody>
                </table>
              ) : <div><Translate value="createPartyPage.noGuests" /><hr /></div> }
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
