import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInvite, acceptInvite, rejectInvite} from '../../actions/invites';
import { getParty } from '../../actions/parties';

class InviteShow extends Component {
  componentWillMount() {
    this.props.getInvite(this.props.params.id).then(() => this.props.getParty(this.props.invite.partyId));

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
    if (!invite) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }

    return (
      <div className="row">
        <div className="twelve columns">
            <p>{party.header}</p>
            <p>Description: {party.description}</p>
            <p>When: {party.startDateTime} - {party.endDateTime}</p>
            <p>Where: {party.location}</p>
            <p>Guest: {invite.childName}</p>
            <p>Invite status: {invite.inviteStatus}</p>
            <button onClick={this.onAcceptClick.bind(this)} className="button u-full-width">Accept</button>
            <button onClick={this.onRejectClick.bind(this)} className="button u-full-width">Reject</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { invite: state.invites.invite, party: state.parties.party};
}

export default connect(mapStateToProps, { getInvite, getParty, acceptInvite, rejectInvite })(InviteShow);
