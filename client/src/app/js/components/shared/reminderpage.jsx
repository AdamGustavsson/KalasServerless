import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";

import { Translate,I18n} from 'react-redux-i18n';
import { createReminder } from '../../actions/reminders';

import DateTimePicker from  'react-widgets/lib/DateTimePicker';

import Moment from 'moment';

var momentLocalizer = require('react-widgets/lib/localizers/moment');
momentLocalizer(Moment);

class ReminderPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
    Moment.locale(this.props.locale);
    this.state = {reminderDate: null};
  }


  handleSubmit(event) {
    event.preventDefault();
    const mobileNumber = this.props.invite&&this.props.invite.mobileNumber?this.props.invite.mobileNumber:this.refs.mobileNumber.value;
    const reminderDate = this.state.reminderDateString;
    if (mobileNumber.length !== 0 && reminderDate ) {
      const reminder = {
        mobileNumber,
        reminderDate
      };
      this.props.createReminder(reminder,this.props.locale);
      ga('send', {
        hitType: 'event',
        eventCategory: 'Reminder',
        eventAction: 'CreateReminder',
        label: reminderDate
      });
    } else {
      alert(I18n.t('reminderPage.error'));
    }
  }

  render() {
    var changeDate = (name, date, dateString) => {
      this.setState({[name]: date, [name + 'String']: Moment(date).format('YYYY-MM-DD')});
    };
    const {invite } = this.props;
    const {reminderCreated} = this.props;
    return (
      <div className="twelve columns">
        <h4><Translate value="reminderPage.heading" /></h4>
        {reminderCreated?
          <h5><Translate value="reminderPage.reminderCreated" /></h5>
        :
        <form onSubmit={this.handleSubmit.bind(this)}>
          {invite?
            <p><Translate value="reminderPage.descriptionHaveNumber" mobileNumber={invite.mobileNumber} /></p>:
            <div>
              <p><Translate value="reminderPage.descriptionDontHaveNumber" />:</p>
              <Translate value="reminderPage.mobileNumber" />:
              <input type="tel" placeholder={I18n.t('createPartyPage.hostUser_example')} className="u-full-width" ref="mobileNumber" />
            </div>
          }
          <DateTimePicker placeholder={I18n.t('reminderPage.date')} value={this.state.reminderDate} defaultValue={null}  onChange={changeDate.bind(null,'reminderDate')} format={"YYYY-MM-DD"} finalView={"month"} min={new Date()} time={false} className="u-full-width" />
          <input type="submit" className="button button-primary" value={I18n.t('reminderPage.create')}/>
        </form>
      }
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {locale: state.i18n.locale,invite:state.invites.invite,reminderCreated:state.reminders.reminderCreated};
}

export default connect(mapStateToProps, { createReminder })(ReminderPage);
