import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
const imageSource = require('./polka.png');
require('./index.css');
export default class PolkaTheme extends Component {

  render() {
    const inviteMightBeNull = this.props.invite;
    const { party } = this.props;
    const { locale } = this.props;
    this.props.setBackground(party.theme);
    return(
    <div className="frame" id={"inviteFrame-"+party.theme} >
        <div >
          <img src={imageSource} id={"themeImage-"+party.theme}/>
        </div>
        <p className="header">{party.header}</p>
        <p>{party.description}</p>
        <p><Translate value="invitePage.when" />: {party.startDateTime} - {party.endDateTime}</p>
        <p><Translate value="invitePage.where" />: {party.partyLocation}</p>
        {inviteMightBeNull?<p className="header"><Translate value="invitePage.isInvited" name={inviteMightBeNull.childName}/></p>:''}

    </div>
  );
}
}
