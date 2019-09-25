import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Translate,I18n} from 'react-redux-i18n';
import { payForTheme } from '../../actions/payment';
require('./index.css');

export default class PaymentModule extends Component {
  onPurchaseClick(){
    this.props.payForTheme();
    this.forceUpdate();
    ga('send', {
      hitType: 'event',
      eventCategory: 'Payment',
      eventAction: 'SimulatedPayment_' + this.props.paymentMethod,
      eventLabel: this.props.theme.id,
      eventValue: this.props.theme.price
    });
  }
  render() {
    const { theme, paymentMethod, isThemePaidFor, isDefault } = this.props;

    if (!theme.paid){
        return (<div className="row">
                  <div className="twelve columns"></div>
                </div>);
    }
    return (
      <div className="row">
        <div className="twelve columns">
          <div style={{marginTop:'20px'}} className={"paymentModule frame inviteFrame-"+theme.id}>
            <Translate value="createPartyPage.paymentPremiumCard" /> <br/>
            <Translate value="createPartyPage.paymentCostIs" /><div className="paymentPrice">{theme.price}kr</div><br/>
            <Translate value="createPartyPage.paymentMethod" /><div className="paymentMethod">{paymentMethod}</div><br/><br/>
            {isThemePaidFor?
              <Translate value="createPartyPage.paymentIntegrationIsNotReady" paymentMethod={paymentMethod} />:
              <button onClick={this.onPurchaseClick.bind(this)} className="button button-primary">Köp</button>
            }
            <br/>
            {isDefault?<Translate value="createPartyPage.freeAvailable" />:''}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { isThemePaidFor:state.payment.isThemePaidFor,locale: state.i18n.locale};
}

export default connect(mapStateToProps, { payForTheme})(PaymentModule);
