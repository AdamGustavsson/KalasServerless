import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import EditablePartyField from '../../editablePartyField';
import  WebFont from 'webfontloader';
import Moment from 'moment';
require('./index.css');
const leftFlagSource = require('./flags3.png');
const rightFlagSource = require('./flags2.png');
export default class BannerTheme extends Component {

  constructor(props) {
    super(props);
    this.state = {fontsLoaded: false};
  }

  onUpdate(object){
    if(object.header){
      this.forceUpdate()
    }
    this.props.updatePartyField(object)
  }

  componentWillMount() {
    WebFont.load({
        google: {
          families: ['Henny Penny']
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
    <div className={"content-" + party.theme + " frame font-"+ party.theme} >
        <div className={"container-" + party.theme}>
        <img id={"flags-left-" + party.theme} src={leftFlagSource} className={"flags-" + party.theme}></img> 
        <img id={"flags-right-" + party.theme} src={rightFlagSource} className={"flags-" + party.theme}></img>
        
        
        <div className={"header-"+party.theme + (party.header&&party.header.trim().length>25?" long":"")}>
           <EditablePartyField
            editEnabled={this.props.editEnabled}
            value={this.props.party.header}
            change={this.onUpdate.bind(this)}
            propName="header"
            theme={party.theme}
           />
        </div>
    
          
          
         <div className={"description-"+party.theme + (party.description&&party.description.length>167?" long":"")}>
         <EditablePartyField
            isTextArea={true}
            editEnabled={this.props.editEnabled}
            value={party.description}
            change={this.props.updatePartyField}
            propName="description"
            theme={party.theme}/>
          </div>
        <div className={"last-"+party.theme}>  
        <div className="container" ><div ><Translate value="invitePage.when" /></div>
            <div>
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
          </div>
          <div className="container" ><div><Translate value="invitePage.where" /></div>
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
