import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createInvite } from '../../actions/invites';
import { Translate,I18n} from 'react-redux-i18n';
import ga from 'ga-react-router'
import {MobileNumberValidation} from '../../mobileNumberValidation';

class InvitesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleSubmit(event) {
    event.preventDefault();

    const mobileNumber = this.refs.mobileNumber.value;
    const childName = this.refs.childName.value;


    if (mobileNumber.length !== 0 && childName.length !== 0 && MobileNumberValidation.isValidSwedishMobileNumber(mobileNumber)) {
      const invite = {
        mobileNumber,
        childName
      };

      this.props.createInvite(invite, this.props.party.id, this.props.token);
      if(this.props.invitesBefore&&this.props.invitesBefore.length==3){
        ga('send', {
          hitType: 'event',
          eventCategory: 'Invite',
          eventAction: 'Create4thInvite',
          eventLabel: childName
        });
      }
      ga('send', {
        hitType: 'event',
        eventCategory: 'Invite',
        eventAction: 'CreateInvite',
        eventLabel: childName
      });
      this.refs.mobileNumber.value = null;
      this.refs.childName.value = null;
      this.forceUpdate();
    } else {
      alert(I18n.t('createPartyPage.mobileError'));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <Translate value="createPartyPage.guestName" />:
            <input type="text" placeholder={I18n.t('createPartyPage.guestName_example')} className="u-full-width" ref="childName" />
            <Translate value="createPartyPage.mobileNumber" />:
            <input type="tel" placeholder={I18n.t('createPartyPage.mobileNumber_example')} className="u-full-width" ref="mobileNumber" />
            <input type="submit" value={I18n.t('createPartyPage.invite')} className="u-pull-right button button-primary" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    if(state.users.currentUser){
      return { token: state.users.currentUser.token, party: state.parties.party, invitesBefore:state.invites.all};
    } else {
      return { token: null, party: state.parties.party, invitesBefore:state.invites.all};
    }
}

export default connect(mapStateToProps, { createInvite })(InvitesNew);
