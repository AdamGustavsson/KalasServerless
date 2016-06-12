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

class PartiesNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
  super(props);
  this.state = {startDateTime: null,
                startDateTimeString: null,
                endDateTime: null,
                endDateTimeString: null};

}


  handleSubmit(event) {
    event.preventDefault();

    const header = this.refs.header.value;
    const description = this.refs.description.value;
    const childName = this.refs.childName.value;
    const startDateTime = this.state.startDateTimeString;
    const endDateTime = this.state.endDateTimeString;
    const partyLocation = this.refs.partyLocation.value;

    if (header.length !== 0 && description.length !== 0 && childName.length !== 0 && startDateTime.length !== 0 && endDateTime.length !== 0 && partyLocation.length !== 0) {
      const party = {
        header,
        description,
        childName,
        startDateTime,
        endDateTime,
        partyLocation
      };
      this.props.createParty(party,this.props.token);
    } else {
      alert('Please fill out all fields');
    }
  }

  render() {
    var change = (name, date, dateString) => {
      //if(name=='startDateTime'&&this.state.endDateTime==null){
      //  this.setState({endDateTime: date, endDateTimeString: dateString})
    //  }
      this.setState({[name]: date, [name + 'String']: dateString})
    };
    return (
      <div className="row">
        <div className="tweleve columns">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h1>Create party</h1>
            <hr />
            <input type="text" placeholder="Header" className="u-full-width" ref="header" />
            <input type="text" placeholder="Description" className="u-full-width" ref="description" />
            <input type="text" placeholder="Child name" className="u-full-width" ref="childName" />
            <DateTimePicker placeholder="Start time" value={this.state.startDateTime} onChange={change.bind(null,'startDateTime')} format={"YYYY-MM-DD HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} time={true} className="u-full-width" />
            <DateTimePicker placeholder="End time" min={this.state.startDateTime} value={this.state.endDateTime} onChange={change.bind(null,'endDateTime')}  format={"HH:mm"} step={15} finalView={"month"} timeFormat={"HH:mm"} calendar={false} className="u-full-width" />
            <input type="text" placeholder="Location" className="u-full-width" ref="partyLocation" />
            <input type="submit" className="button button-primary" />
            <Link to="/" className="u-pull-right button">Cancel</Link>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.users.currentUser.token};
}

export default connect(mapStateToProps, { createParty })(PartiesNew);
