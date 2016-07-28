import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInvite, acceptInvite, rejectInvite} from '../../actions/invites';
import { getParty } from '../../actions/parties';
require('./polka.css');
const flagSource = require('./images/party-flags.png');

class InviteShow extends Component {
  componentWillMount() {
    this.props.getInvite(this.props.params.id).then(() => this.props.getParty(this.props.invite.partyId));
    document.body.className='polka';
  }
  componentWillUnmount() {
    document.body.className='';
  }

  onAcceptClick(event) {
      this.props.acceptInvite(this.props.invite.id);
  }
  onRejectClick(event) {
      this.props.rejectInvite(this.props.invite.id);
  }


  render() {
    const { invite } = this.props;
    const { party } = this.props;

    if (!invite || !party) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }



    return (
      <div className="row">
        <div className="twelve columns frame">
        <img src={flagSource}/>
            <p className="header">{party.header}</p>
            <p>{party.description}</p>
            <p>When: {party.startDateTime} - {party.endDateTime}</p>
            <p>Where: {party.location}</p>
            <p className="header">{invite.childName} is invited</p>
            <p>Invite status: {invite.inviteStatus}</p>
            <button onClick={this.onAcceptClick.bind(this)} className="button u-full-width accept">Accept</button>
            <button onClick={this.onRejectClick.bind(this)} className="button u-full-width reject">Reject</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { invite: state.invites.invite, party: state.parties.party};
}

export default connect(mapStateToProps, { getInvite, getParty, acceptInvite, rejectInvite })(InviteShow);
