import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createParty } from '../../actions/parties';
import { Link } from 'react-router';

import 'react-widgets/dist/css/react-widgets.css';
import './styles.css';

import DateTimePicker from  'react-widgets/lib/DateTimePicker';

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
        <div className="tweleve columns" style={{marginTop:'100px'}}>
          Tyvärr har vår SMS-leverantör tekniska problem för närvarande. Vi hoppas att de löser det inom kort så att vi kan vara i drift igen. 
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { locale: state.i18n.locale};
}

export default connect(mapStateToProps, { createParty })(PartiesNew);
