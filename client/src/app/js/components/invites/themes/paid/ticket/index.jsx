import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import EditablePartyField from '../../editablePartyField';
import  WebFont from 'webfontloader';
import Moment from 'moment';
import ReactArcText from '../../../../shared/arctext';
require('./index.css');
const imageSource = require('./ticket.png');
const crownSource = require('./crown.jpg');
export default class TicketTheme extends Component {

  constructor(props) {
    super(props);
    this.state = {fontsLoaded: false};
  }

  onFontsLoaded(){
    this.state.fontsLoaded=true;
    console.log("fontsloaded")
    this.forceUpdate()
  }

  componentWillMount() {
    WebFont.load({
        google: {
          families: ['Ewert']
        },active: this.onFontsLoaded.bind(this)
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
        <img src={imageSource} className={"img-" + party.theme}></img>
        <img src={crownSource} className={"crown-img-" + party.theme}></img>
        <div className="edit-ticket-header">
           <EditablePartyField
            editEnabled={this.props.editEnabled}
            value={party.header}
            change={this.props.updatePartyField}
            propName="header"
            theme={party.theme}/>
        </div>
    
          <ReactArcText
          text={party.header}
          direction={1}
          arc={window.innerWidth/2*0.84}
          fontsLoaded={this.state.fontsLoaded}
          class={"header-"+party.theme + (party.header&&party.header.length>15?" long":"")}/>
          
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
