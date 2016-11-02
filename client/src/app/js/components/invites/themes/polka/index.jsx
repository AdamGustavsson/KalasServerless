import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import EditablePartyField from '../editablePartyField';
import Moment from 'moment';
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
      <img src={imageSource} id={"themeImage-"+party.theme}/>
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
  );
}
}
