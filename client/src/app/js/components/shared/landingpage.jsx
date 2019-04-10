import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import './landingpage.css';

import { Translate,I18n} from 'react-redux-i18n';
import ThemedInvite from '../invites/themes/themedInvite';
import PartyKingInvites from './partyKingInvites';
import {throwError} from '../../actions/error';
const imageSource = require('./images/kalasLogo.png');

class LandingPage extends Component {



getDummyParty(theme){
  const name = theme=="polka"?"Amir":"Anna";
  var description;
  if(theme=="bowling"){
    description = I18n.t('theme.dummyParty.description1',{name:name});
  } else if(theme=="laser"||theme=="prison"){
    description = I18n.t('theme.dummyParty.description3',{name:name});
  } else {
    description = I18n.t('theme.dummyParty.description2',{name:name});
  }

  return {
    header:theme=="ladybug"?I18n.t('theme.dummyParty.header1',{name:name}):I18n.t('theme.dummyParty.header2',{name:name}),
    description:description,
    startDateTime:"2016-12-06: 18.00",
    endDateTime: "20:00",
    partyLocation: theme=="bowling"?"John Scott's, Partille Arena":"Kungsgatan 23, Göteborg",
    theme:theme
  }
}
getDummyInvite(){
  return {childName:"Lisa"}
}
setThemeBackground(currentTheme){

}


  render() {

    return (
      <div>
        <div className="section">
            <div className="row first">
              <div className="twelve columns">
                <img src={imageSource} className="logo"/>
                <h4 className="logo-heading"><Translate value="landingPage.heading" /></h4>
                <p className="description"><Translate value="landingPage.description" /></p>
                <p>
                  <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
                </p>
              </div>
            </div>
        </div>
        <div className="section">
            <div className="row second">
              <div className="twelve columns">
                <h4 className="heading"><Translate value="landingPage.howItWorks" /></h4>
                <p className="description"><Translate value="landingPage.howItWorksDetails1" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails2" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails3" /></p>
                <p className="description"><Translate value="landingPage.howItWorksDetails4" /></p>
                <p>
                  <Link to={'/parties/new'} className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
                </p>
                <p className="description"><Translate value="landingPage.themes" /></p>

              </div>
            </div>
        </div>
        <div className="row">
          <div className="four columns laser themePreview" >
            <ThemedInvite party={this.getDummyParty("laser")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="four columns prison themePreview" >
            <ThemedInvite party={this.getDummyParty("prison")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="four columns polka themePreview" >
            <ThemedInvite party={this.getDummyParty("polka")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          </div>
          <div className="row">
          <div className="four columns bowling themePreview" >
            <ThemedInvite party={this.getDummyParty("bowling")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          <div className="four columns ladybug themePreview" >
            <ThemedInvite party={this.getDummyParty("ladybug")} invite={this.getDummyInvite()} locale={this.props.locale} setBackground={this.setThemeBackground.bind(this)}/>
          </div>
          </div>
          <PartyKingInvites/>
          <div className="row">
          <div className="section">
            <div className="row second">
              <div className="twelve columns">
                <h4 className="heading"><Translate value="landingPage.reminderHeader" /></h4>
                <p className="description"><Translate value="landingPage.reminderDetails" /></p>
                <Link to={'reminder'} className="button button-primary"><Translate value="invitePage.remindMeButton" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.users.currentUser,locale: state.i18n.locale};
}

export default connect(mapStateToProps, {throwError})(LandingPage);
