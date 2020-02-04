import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import EditablePartyField from '../../editablePartyField';
import  WebFont from 'webfontloader';
import Moment from 'moment';
require('./index.css');
const imageSource = require('./pirateRedBGSmall.jpg');
export default class PirateTheme extends Component {

  componentWillMount() {
    WebFont.load({
        google: {
          families: ['Fondamento']
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
    <div className={"content-"+ party.theme +" frame font-"+ party.theme} >
        <div className={"container-"+ party.theme }>
        <img src={imageSource} className={"img-"+party.theme}></img>
        <div className={"header-"+party.theme} >
          <EditablePartyField
            editEnabled={this.props.editEnabled}
            value={party.header}
            change={this.props.updatePartyField}
            propName="header"
            theme={party.theme}/>
         </div>
         <div className={"description-"+party.theme}>
         <EditablePartyField
            isTextArea={true}
            editEnabled={this.props.editEnabled}
            value={party.description}
            change={this.props.updatePartyField}
            propName="description"
            theme={party.theme}/>
          </div>
        <div className={"last-"+party.theme}>  
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
          <div><Translate value="invitePage.where" />:&nbsp;
          <EditablePartyField
            editEnabled={this.props.editEnabled}
            value={party.partyLocation}
            change={this.props.updatePartyField}
            propName="partyLocation"
            theme={party.theme}/>
          </div>
            {inviteMightBeNull?<p className={"child-"+party.theme}><Translate value="invitePage.isInvited" name={inviteMightBeNull.childName}/></p>:''}
          </div>
        </div>
    </div>
  );
}
}
