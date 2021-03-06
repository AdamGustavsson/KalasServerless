import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import EditablePartyField from '../editablePartyField';
import  WebFont from 'webfontloader';
import Moment from 'moment';
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
    <div className={"frame content-" +party.theme+ " font-"+ party.theme + " inviteFrame-"+party.theme} >
        <div id={"themeImage-"+party.theme}>
          <img src={imageSource} />
        </div>
        <div className="container-ladybug">
        <br/>
        <div className={"header-"+party.theme} >
          <EditablePartyField
            editEnabled={this.props.editEnabled}
            value={party.header}
            change={this.props.updatePartyField}
            propName="header"
            theme={party.theme}/>
         </div>
         <br/>
         <div>
         <EditablePartyField
            isTextArea={true}
            editEnabled={this.props.editEnabled}
            value={party.description}
            change={this.props.updatePartyField}
            propName="description"
            theme={party.theme}/>
          </div>
          <br/>
        <div><Translate value="invitePage.when" />:&nbsp;
          <EditablePartyField
           editEnabled={this.props.editEnabled}
           value={party.startDateTime}
           change={this.props.updatePartyField}
           validate={value => Moment(value, 'YYYY-MM-DD HH:mm').isValid()}
           propName="startDateTime"
           theme={party.theme}/>

          -
          <EditablePartyField
           editEnabled={this.props.editEnabled}
           value={party.endDateTime}
           change={this.props.updatePartyField}
           propName="endDateTime"
           theme={party.theme}/>
        </div>
        <br/>
        <div><Translate value="invitePage.where" />:&nbsp;
        <EditablePartyField
          editEnabled={this.props.editEnabled}
           value={party.partyLocation}
           change={this.props.updatePartyField}
           propName="partyLocation"
           theme={party.theme}/>
        </div>
          {inviteMightBeNull?<p className={"header-"+party.theme}><Translate value="invitePage.isInvited" name={inviteMightBeNull.childName}/></p>:''}
        </div>
    </div>
  );
}
}
