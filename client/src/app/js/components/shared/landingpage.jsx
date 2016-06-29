import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import './landingpage.css';


class LandingPage extends Component {


  render() {
    const {currentUser} = this.props;

    return (
      <div>
        <div className="section">
            <div className="row first">
              <div className="twelve columns">
                <h4 className="heading">Birthday parties made simple</h4>
                <p className="description">Party time helps you invite guest to your child's birthday party and keep track of RSVPs.</p>
                <p>
                  <Link to={ currentUser?'parties/new':'users/new' } className="button button-primary">Create your first party</Link>
                </p>
              </div>
            </div>
        </div>
        <div className="section">
            <div className="row second">
              <div className="twelve columns">
                <h4 className="heading">How it works</h4>
                <p className="description">You enter the details of you birthday party and and add the names of the invited children along with a mobile number of their parent. </p>
                <p className="description">We then send the invite to each parent in an SMS with a link to RSVP. </p>
                <p className="description">You get an SMS whenever a parent RSVPs with a list of the current status of all invited children.</p>
                <p className="description">It's that simple! </p>
                <p>
                  <Link to={ currentUser?'parties/new':'users/new' } className="button button-primary">Create your first party</Link>
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
