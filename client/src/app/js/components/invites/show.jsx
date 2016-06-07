import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInvite, acceptInvite, rejectInvite} from '../../actions/invites';

class InviteShow extends Component {
  componentWillMount() {
    this.props.getInvite(this.props.params.id);
  }

  onAcceptClick(event) {
      this.props.acceptInvite(this.props.invite.id);
  }
  onRejectClick(event) {
      this.props.rejectInvite(this.props.invite.id);
  }


  render() {
    const { invite } = this.props;

    if (!invite) {
      return <div className="row"><div className="twelve columns">Loading...</div></div>
    }

    return (
      <div className="row">
        <div className="twelve columns">
            <p>{invite.childName}</p>
            <p>{invite.inviteStatus}</p>
            <button onClick={this.onAcceptClick.bind(this)} className="button u-full-width">Accept</button>
            <button onClick={this.onRejectClick.bind(this)} className="button u-full-width">Reject</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { invite: state.invites.invite};
}

export default connect(mapStateToProps, { getInvite, acceptInvite, rejectInvite })(InviteShow);
