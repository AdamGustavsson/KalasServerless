import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import PolkaTheme from './polka/';
import BowlingTheme from './bowling/';

export default class themedInvite extends Component {
  componentWillUnmount() {
    document.body.className='';
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
      default:
        party = Object.assign({}, party, {
          theme: "polka"
        })
        ThemeComponent = PolkaTheme;
        break;
       }
    return(
      <ThemeComponent invite={this.props.invite} party={party} locale={this.props.locale}/>
  );
}
}
