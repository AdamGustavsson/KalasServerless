import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createParty } from '../../actions/parties';
import { Link } from 'react-router';

import 'react-widgets/dist/css/react-widgets.css';
import './styles.css';

import DateTimePicker from  'react-widgets/lib/DateTimePicker';

var Moment = require('moment');
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
    const startDateTime = this.state.startDateTimeString;
    const endDateTime = this.state.endDateTimeString;
    const partyLocation = this.refs.partyLocation.value;

    if (hostUser.length !== 0 && header.length !== 0 && description.length !== 0 && childName.length !== 0 && startDateTime && startDateTime.length !== 0 && endDateTime && endDateTime.length !== 0 && partyLocation.length !== 0) {
      const party = {
        hostUser,
        header,
        description,
        childName,
        startDateTime,
        endDateTime,
        partyLocation
      };
      this.props.createParty(party,this.props.locale);
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'create',
        eventLabel: party.header
      });
    } else {
      alert(I18n.t('createPartyPage.error'));
    }
  }

  render() {
    var change = (name, date, dateString) => {
      this.setState({[name]: date, [name + 'String']: Moment(date).format('YYYY-MM-DD HH:mm')});
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
            <input type="text" placeholder={I18n.t('createPartyPage.hostUser_example')} className="u-full-width" ref="hostUser" />
            <br/><br/>

            <Translate value="createPartyPage.childName" />:
            <input type="text" placeholder={I18n.t('createPartyPage.childName_example')} className="u-full-width" ref="childName" />
            <Translate value="createPartyPage.startDateTime" />:
            <DateTimePicker placeholder={I18n.t('createPartyPage.startDateTime')} value={this.state.startDateTime} defaultValue={null} onChange={change.bind(null,'startDateTime')} format={"YYYY-MM-DD HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} time={true} className="u-full-width" />
            <Translate value="createPartyPage.endDateTime" />:
            <DateTimePicker placeholder={I18n.t('createPartyPage.endDateTime')} min={this.state.startDateTime} value={this.state.endDateTime} onChange={change.bind(null,'endDateTime')}  format={"HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} calendar={false} className="u-full-width" />
            <Translate value="createPartyPage.location" />:
            <input type="text" placeholder={I18n.t('createPartyPage.location_example')} className="u-full-width" ref="partyLocation" />
            <Translate value="createPartyPage.header" />:
            <input type="text" placeholder={I18n.t('createPartyPage.header_example')} className="u-full-width" ref="header" />
            <Translate value="createPartyPage.description" />:
            <textarea rows="5" placeholder={I18n.t('createPartyPage.description_example')} className="u-full-width" ref="description" />
            <input type="submit" className="button button-primary" value={I18n.t('createPartyPage.create')}/>
            <Link to="/" className="u-pull-right button"><Translate value="general.cancel" /></Link>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { locale: state.i18n.locale};
}

export default connect(mapStateToProps, { createParty })(PartiesNew);
