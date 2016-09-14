import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getParty } from '../../actions/parties';
import { Link } from 'react-router';
import InvitesIndex from '../invites/index';
import InvitesNew from '../invites/new';
import { Translate} from 'react-redux-i18n';

class PartiesShow extends Component {
  componentWillMount() {
    this.props.getParty(this.props.params.id);
  }

  render() {
    const { party } = this.props;
    const { currentUser } = this.props;


    if (!party) {
      return <div className="row"><div className="twelve columns"><Translate value="general.loading" /></div></div>
    }
    if (!currentUser) {
      return <div className="row"><div className="twelve columns"><br/><br/><Translate value="createPartyPage.pleaseLogin" /></div></div>
    }

    return (
      <div className="row">
        <div className="twelve columns">
          <h4><br/>{party.header}</h4>
          <hr />
          <p>{party.description}</p>
          <p>{party.childName}</p>
          <p>{party.startDateTime}</p>
          <p>{party.endDateTime}</p>
          <p>{party.partyLocation}</p>
        </div>
        <InvitesIndex/>
        <InvitesNew/>
        <hr />
        <Link to='parties/my' className="button u-full-width"><Translate value="general.back" /></Link>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { party: state.parties.party, currentUser: state.users.currentUser};
}

export default connect(mapStateToProps, { getParty })(PartiesShow);
