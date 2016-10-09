import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";

import { Translate,I18n} from 'react-redux-i18n';

class ReminderPage extends Component {



  render() {

    return (
      <div className="twelve columns">
        <h4><Translate value="reminderPage.heading" /></h4>
        <p><Translate value="reminderPage.description" /></p>
        <p>
          <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
        </p>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return {locale: state.i18n.locale};
}

export default connect(mapStateToProps)(ReminderPage);
