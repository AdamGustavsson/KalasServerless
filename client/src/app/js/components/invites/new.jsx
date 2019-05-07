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
      ga('send', {
        hitType: 'event',
        eventCategory: 'Invite',
        eventAction: 'CreateInvite'
      });
      this.refs.mobileNumber.value = null;
      this.refs.childName.value = null;
    } else {
      alert(I18n.t('createPartyPage.mobileError'));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="twelve columns" style={{color:'red'}}>
        Tyvärr har vår SMS-leverantör tekniska problem för närvarande. Vi hoppas att de löser det inom kort så att vi kan vara i drift igen.
        Det innebär att inga SMS kan skickas. Du kommer inte få SMS när någon svarat på inbjudan. Listan med inbjudningarnas status stämmer fortfarande. Vi beklagar olägenheten och hoppas att vår leverantor snart har löst sina problem.
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    if(state.users.currentUser){
      return { token: state.users.currentUser.token, party: state.parties.party};
    } else {
      return { token: null, party: state.parties.party};
    }
}

export default connect(mapStateToProps, { createInvite })(InvitesNew);
