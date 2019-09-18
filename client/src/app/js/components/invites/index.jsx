import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInvitesForParty } from '../../actions/invites';
import { Link } from 'react-router';
import { Translate,I18n} from 'react-redux-i18n';

class InvitesIndex extends Component {
  componentWillMount() {
    this.props.getInvitesForParty(this.props.party.id);
  }
  onEmailLinkClick(){
    ga('send', {
    hitType: 'event',
    eventCategory: 'Invite',
    eventAction: 'Email'
  });
  alert(I18n.t('createPartyPage.noGuests_email_alert'));
  return false;
  }

  render() {
    const { showPhone } = this.props
    const { invites } = this.props;
    const { party } = this.props;
    const statusOrder = {ACCEPTED: 1,
                        REJECTED: 2,
                        CREATED: 3,
                        INVITED: 4};

    var lastStatus = 0;
    invites.sort((a, b) => {
      return statusOrder[a.inviteStatus] - statusOrder[b.inviteStatus];
    })
    // first invite has status INVITED so all will have it (because of the sort above)
    const allInvitesAreNew = invites && invites.length>0 && invites[0].inviteStatus=="INVITED";
    // differ the message of INVITED depending on the context
    const statusText = {CREATED: '',
                        INVITED: allInvitesAreNew?I18n.t('createPartyPage.inviteSent'):I18n.t('invitePage.inviteSent'),
                        ACCEPTED: I18n.t('createPartyPage.accepted'),
                        REJECTED: I18n.t('createPartyPage.rejected')};
        return (
          <div className="row">
            <div className={"twelve columns frame inviteFrame-"+(party.theme?party.theme:"polka")}>
              <h4><Translate value="createPartyPage.invitedGuests" /></h4>
              {invites&&invites.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th><Translate value="createPartyPage.guestNameHeader" /></th>
                      <th><Translate value="createPartyPage.inviteStatus" /></th>
                      {showPhone?<th><Translate value="createPartyPage.mobileNumberHeader" /></th>:''}
                    </tr>
                  </thead>
                  <tbody>
                  {
                    invites.map((invite) => {
                    return (
                      <tr key={'invite-' + invite.id}>
                        <td>{invite.childName}</td>
                        <td>{statusText[invite.inviteStatus]}</td>
                        {showPhone?<td><a href={"tel:" + invite.mobileNumber}>{invite.mobileNumber}</a></td>:''}
                      </tr>
                    )}
                  )}
                  </tbody>
                </table>
              ) : <div><Translate value="createPartyPage.noGuests" />
                    <div>
                      <Translate value="createPartyPage.noGuests_email_question" /><br/>
                      <a onClick={this.onEmailLinkClick.bind(this)} >
                        <Translate value="createPartyPage.noGuests_email_link" />
                      </a>
                    </div>
                  </div> }
            </div>
          </div>
      );
  }
}

function mapStateToProps(state) {
  return { party: state.parties.party, invites: state.invites.all};
}
export default connect(mapStateToProps, { getInvitesForParty })(InvitesIndex);
