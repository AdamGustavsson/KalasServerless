import React, { Component, PropTypes } from 'react';
import { Translate,I18n} from 'react-redux-i18n';
import PolkaTheme from './polka';
import BowlingTheme from './bowling';

export default class themedInvite extends Component {
  componentWillUnmount() {
    document.body.className='';
  }
  render() {
    const { invite } = this.props;
    const { party } = this.props;
    const { locale } = this.props;

    var ThemeComponent;
    switch (party.theme) {
      case 'bowling':
        ThemeComponent = BowlingTheme;
        break;
      case 'polka':
        ThemeComponent = PolkaTheme;
        break;
      default:
        party.theme="polka"
        ThemeComponent = PolkaTheme;
        break;
       }
    return(
      <ThemeComponent invite={invite} party={party} locale={locale}/>
  );
}
}
