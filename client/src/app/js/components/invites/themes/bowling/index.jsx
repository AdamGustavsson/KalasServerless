import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
const imageSource = require('./bowling.png');
require('./index.css');
export default class BowlingTheme extends Component {
  componentWillUnmount() {
    document.body.className='';
  }
  render() {
    const  inviteMightBeNull  = this.props.invite;
    const { party } = this.props;
    const { locale } = this.props;
    document.body.className=party.theme;
    return(
    <div className="twelve columns frame" id={"inviteFrame-"+party.theme} >
        <img src={imageSource} id="themeImage"/>
        <p className={"header-"+party.theme}>>{party.header}</p>
        <p>{party.description}</p>
        <p><Translate value="invitePage.when" />: {party.startDateTime} - {party.endDateTime}</p>
        <p><Translate value="invitePage.where" />: {party.partyLocation}</p>
        {inviteMightBeNull?<p className={"header-"+party.theme}>><Translate value="invitePage.isInvited" name={inviteMightBeNull.childName}/></p>:''}

    </div>
  );
}
}
