import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import PolkaTheme from './polka/';
import BowlingTheme from './bowling/';
import LadybugTheme from './ladybug/';
import PrisonTheme from './prison/';
require('./index.css');

export default class themedInvite extends Component {
  componentWillUnmount() {
    document.body.className='';
  }
  setBackground(theme){
    document.body.className=theme;
  }
  render() {
    var party  = this.props.party;

    var ThemeComponent;
    switch (party.theme) {
      case 'bowling':
        ThemeComponent = BowlingTheme;
        break;
      case 'polka':
        ThemeComponent = PolkaTheme;
        break;
      case 'ladybug':
          ThemeComponent = LadybugTheme;
          break;
      case 'prison':
          ThemeComponent = PrisonTheme;
          break;
      default:
        party = Object.assign({}, party, {
          theme: "polka"
        })
        ThemeComponent = PolkaTheme;
        break;
       }
    return(
      <ThemeComponent
      editEnabled={this.props.editEnabled?this.props.editEnabled:false}
      updatePartyField={this.props.updatePartyField}
      invite={this.props.invite}
      party={party}
      locale={this.props.locale}
      setBackground={this.props.setBackground?this.props.setBackground:this.setBackground}/>
  );
}
}
