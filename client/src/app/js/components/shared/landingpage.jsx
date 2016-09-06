import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import './landingpage.css';

import { Translate} from 'react-redux-i18n';

class LandingPage extends Component {


  render() {
    const {currentUser} = this.props;

    return (
      <div>
        <div className="section">
            <div className="row first">
              <div className="twelve columns">
                <h4 className="heading"><Translate value="landingPage.heading" /></h4>
                <p className="description"><Translate value="landingPage.description" /></p>
                <p>
                  <Link to={ currentUser?'parties/new':'users/new' } className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
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
                  <Link to={ currentUser?'parties/new':'users/new' } className="button button-primary"><Translate value="landingPage.newPartyButton" /></Link>
                </p>
              </div>
            </div>
        </div>

      </div>
  );
  }
}
const mapStateToProps = ({users: {currentUser}}) => ({currentUser});

export default connect(mapStateToProps, {})(LandingPage);
