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
    const { theme, paymentMethod, isThemePaidFor } = this.props;

    if (!theme.paid){
        return (<div className="row">
                  <div className="twelve columns"></div>
                </div>);
    }
    return (
      <div className="row">
        <div className="twelve columns">
          <div style={{marginTop:'20px'}} className={"paymentModule frame inviteFrame-"+theme.id}>
            Du har valt ett premium-inbjudningskort.<br/>
            Kostnaden är <div className="paymentPrice">{theme.price}kr</div><br/>
            Betalning sker med <div className="paymentMethod">{paymentMethod}</div><br/><br/>
            {isThemePaidFor?
              'Vår integration med ' + paymentMethod + ' är ännu inte klar. Under tiden bjuder vi på premium-inbjudningskorten. Var så god!':
              <button onClick={this.onPurchaseClick.bind(this)} className="button button-primary">Köp</button>
            }
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
