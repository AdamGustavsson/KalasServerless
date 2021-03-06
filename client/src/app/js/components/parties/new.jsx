import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createParty } from '../../actions/parties';
import PartyKingInvites from '../shared/partyKingInvites';
import { Link } from 'react-router';
import withDataLayerPageView from '../shared/withDataLayerPageView';

import 'react-widgets/dist/css/react-widgets.css';
import './styles.css';

import DateTimePicker from  'react-widgets/lib/DateTimePicker';

import {MobileNumberValidation} from '../../mobileNumberValidation';

import Moment from 'moment';

var momentLocalizer = require('react-widgets/lib/localizers/moment');
momentLocalizer(Moment);

import { Translate,I18n} from 'react-redux-i18n';
import ga from 'ga-react-router'

class PartiesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
  super(props);
  Moment.locale(this.props.locale);
  this.state = {startDateTime: null,
                startDateTimeString: null,
                endDateTime: null,
                endDateTimeString: null};

}

  handleSubmit(event) {
    event.preventDefault();

    const hostUser = this.refs.hostUser.value;
    const header = this.refs.header.value;
    const description = this.refs.description.value;
    const childName = this.refs.childName.value;
    const startDateTimeUnix = Moment(this.state.startDateTime).unix();
    const startDateTime = this.state.startDateTimeString;
    const endDateTime = this.state.endDateTimeString;
    const partyLocation = this.refs.partyLocation.value;
    if(!MobileNumberValidation.isValidSwedishMobileNumber(hostUser)){
      alert(I18n.t('createPartyPage.mobileError'));
      return
    }
    if (hostUser.length !== 0 && header.length !== 0 && description.length !== 0 && childName.length !== 0 && startDateTime && startDateTime.length !== 0 && endDateTime && endDateTime.length !== 0 && partyLocation.length !== 0) {
      const party = {
        hostUser,
        header,
        description,
        childName,
        startDateTimeUnix,
        startDateTime,
        endDateTime,
        partyLocation
      };
      this.props.createParty(party,this.props.locale);
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'CreateParty',
        eventLabel: party.header
      });
    } else {
      alert(I18n.t('createPartyPage.error'));
    }
  }

  render() {
    var changeStart = (name, date, dateString) => {
      this.setState({[name]: date, [name + 'String']: Moment(date).format('YYYY-MM-DD HH:mm')});
    };
    var changeEnd = (name, date, dateString) => {
      this.setState({[name]: date, [name + 'String']: Moment(date).format('HH:mm')});
    };
    return (
        <div className="row">
        <div className="tweleve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1><Translate value="createPartyPage.createParty" /></h1>
            <h2><Translate value="createPartyPage.step1" /></h2>
            <h3><Translate value="createPartyPage.step1_description" /></h3>
            <hr />
            <Translate value="createPartyPage.hostUser" />:
            <input type="tel" placeholder={I18n.t('createPartyPage.hostUser_example')} className="u-full-width" ref="hostUser" />
            <br/><br/>

            <Translate value="createPartyPage.childName" />:
            <input type="text" placeholder={I18n.t('createPartyPage.childName_example')} className="u-full-width" ref="childName" />
            <Translate value="createPartyPage.location" />:
            <input type="text" placeholder={I18n.t('createPartyPage.location_example')} className="u-full-width" ref="partyLocation" />
            <Translate value="createPartyPage.startDateTime" />:
            <DateTimePicker placeholder={I18n.t('createPartyPage.startDateTime')} value={this.state.startDateTime} defaultValue={null} onChange={changeStart.bind(null,'startDateTime')} format={"YYYY-MM-DD HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} time={true} className="u-full-width" />
            <Translate value="createPartyPage.endDateTime" />:
            <DateTimePicker placeholder={I18n.t('createPartyPage.endDateTime')} min={this.state.startDateTime} value={this.state.endDateTime} onChange={changeEnd.bind(null,'endDateTime')}  format={"HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} calendar={false} className="u-full-width" />
            <Translate value="createPartyPage.header" />:
            <input type="text" placeholder={I18n.t('createPartyPage.header_example')} className="u-full-width" ref="header" />
            <Translate value="createPartyPage.description" />:
            <textarea rows="5" placeholder={I18n.t('createPartyPage.description_example')} className="u-full-width" ref="description" />
            <Link to="/" className="u-pull-left button"><Translate value="general.cancel" /></Link>
            <input type="submit" className="u-pull-right button button-primary" value={I18n.t('createPartyPage.create')}/>
            
          </form>
          <PartyKingInvites/> 
        </div>
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { locale: state.i18n.locale};
}

export default connect(mapStateToProps, { createParty })(withDataLayerPageView(PartiesNew));
