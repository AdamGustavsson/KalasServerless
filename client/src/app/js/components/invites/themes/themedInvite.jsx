import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import PolkaTheme from './polka/';
import BowlingTheme from './bowling/';
import PalaceTheme from './palace/';
import MusicTheme from './music/';
import LaserTheme from './laser/';
import LadybugTheme from './ladybug/';

import PrisonTheme from './prison/';
import CakeTheme from './paid/cake/';
import PirateTheme from './paid/pirate/';
import TicketTheme from './paid/ticket/';
import BannerTheme from './paid/banner/';
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
      case 'palace':
        ThemeComponent = PalaceTheme;
        break;  
      case 'music':
          ThemeComponent = MusicTheme;
          break;
      case 'laser':
          ThemeComponent = LaserTheme;
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
      case 'cake':
          ThemeComponent = CakeTheme;
          break;  
      case 'banner':
        ThemeComponent = BannerTheme;
        break;            
      case 'pirate':
          ThemeComponent = PirateTheme;
          break;    
      case 'ticket':
          ThemeComponent = TicketTheme;
          break;       
      default:
        party = Object.assign({}, party, {
          theme: "cake"
        })
        ThemeComponent = CakeTheme;
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
