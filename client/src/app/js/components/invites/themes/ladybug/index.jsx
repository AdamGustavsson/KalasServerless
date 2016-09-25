import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import  WebFont from 'webfontloader';
require('./index.css');
const imageSource = require('./ladybug.png');
export default class LadybugTheme extends Component {

  componentWillMount() {
    WebFont.load({
        google: {
          families: ['Indie Flower']
        }
      });
  }
  render() {
    const inviteMightBeNull = this.props.invite;
    const { party } = this.props;
    const { locale } = this.props;
    //TODO change the react way
    this.props.setBackground(party.theme);
    return(
    <div  className="frame" id={"inviteFrame-"+party.theme} >
        <div id={"themeImage-"+party.theme}>
          <img src={imageSource} />
        </div>
        <div >
          <p className={"header-"+party.theme}>{party.header}</p>
          <p>{party.description}</p>
          <p><Translate value="invitePage.when" />: {party.startDateTime} - {party.endDateTime}</p>
          <p><Translate value="invitePage.where" />: {party.partyLocation}</p>
          {inviteMightBeNull?<p className={"header-"+party.theme}><Translate value="invitePage.isInvited" name={inviteMightBeNull.childName}/></p>:''}
        </div>
    </div>
  );
}
}
