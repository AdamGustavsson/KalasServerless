import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getInvite, acceptInvite, rejectInvite} from '../../actions/invites';
import { getParty } from '../../actions/parties';
import { Translate,I18n} from 'react-redux-i18n';
import { Link } from "react-router";
import ga from 'ga-react-router';
import FacebookProvider, { Like, Comments } from 'react-facebook';
import Helmet from "react-helmet";
import ThemedInvite from './themes/themedInvite';
import InvitesIndex from './index';
import withDataLayerPageView from '../shared/withDataLayerPageView';
class InviteShow extends Component {
  componentWillMount() {
    this.props.getInvite(this.props.params.id).then(() => this.props.getParty(this.props.invite.partyId)).then(() => this.trackForRemarketing(this.props.party));
  }

  trackForRemarketing(party){
      window.google_trackConversion({
        google_conversion_id: 982175048,
        google_custom_params: {
          partyLocation: party.partyLocation,
        },
        google_remarketing_only: true
      });
      fbq('track', 'ViewContent', {
        content_name: party.partyLocation,
       });
  }
  onAcceptClick(event) {
      if(this.props.invite.inviteStatus!='ACCEPTED'){
        ga('send', {
          hitType: 'event',
          eventCategory: 'Invite',
          eventAction: 'Accept'
        });
      }
      this.props.acceptInvite(this.props.invite.id);
      this.props.invite.inviteStatus="ACCEPTED";
      this.forceUpdate();
      
      
  }
  onRejectClick(event) {
      if(this.props.invite.inviteStatus!='REJECTED'){
        ga('send', {
          hitType: 'event',
          eventCategory: 'Invite',
          eventAction: 'Reject'
        });
      }
      this.props.rejectInvite(this.props.invite.id);
      this.props.invite.inviteStatus="REJECTED";
      this.forceUpdate();
      
  }
  fbReady(){
    window.FB.Event.subscribe('comment.create',
          function(response) {
              console.log('A new comment has been added!');
              ga('send', {
                hitType: 'event',
                eventCategory: 'Comment',
                eventAction: 'CommentCreate',
                eventlabel: 'CommentCreateOnInvitePage'
              });
          }
      );

  }



  render() {
    const { invite } = this.props;
    const { party } = this.props;
    const { locale } = this.props;
    const statusText = {CREATED: I18n.t('invitePage.inviteSent'),
                        INVITED: I18n.t('invitePage.inviteSent'),
                        ACCEPTED: I18n.t('invitePage.accepted'),
                        REJECTED: I18n.t('invitePage.rejected')};
    if (!invite || !party) {
      return <div className="row"><div className="twelve columns"><Translate value="general.loading" /></div></div>
    }
    if(party&&party.status == "PASSED"&&party.offerUrl){
      window.location = party.offerUrl;
    }
    if(invite.mobileNumber){
      ga('set', 'userId', invite.mobileNumber);
    } 
    return (
      <div className="row">
        <Helmet
          title={I18n.t('invitePage.title')}
          meta={[
                {"name": "robots", "content": "noindex,nofollow"}
              ]}
        />
      <ThemedInvite invite={invite} party={party} locale={locale}/>


      <button onClick={this.onAcceptClick.bind(this)} className={"button u-full-width accept-"+ (party.theme?party.theme:"polka")}><Translate value="invitePage.accept" /></button>
      <button onClick={this.onRejectClick.bind(this)} className={"button u-full-width reject-"+ (party.theme?party.theme:"polka")}><Translate value="invitePage.reject" /></button>
      <p><Translate value="invitePage.noReply" /></p>
      <h5><Translate value="invitePage.status" />: {statusText[invite.inviteStatus]}</h5>
      {invite.inviteStatus!='INVITED'?
      <div className="row">
        <div className={"twelve columns frame inviteFrame-"+(party.theme?party.theme:"polka")}>
          <h4><Translate value="invitePage.whatIs" /></h4>
          <h5><Translate value="invitePage.serviceDescription" /></h5>
          <Link to={'/'} className="button button-primary"><Translate value="invitePage.moreInfo" /></Link>
          <br/><Link to={'/integrityPolicy'} >
          <Translate value="loginPage.integrityPolicy" /></Link>
          <br/>&nbsp;
          <h5><Translate value="invitePage.remindMe" /></h5>
          <Link to={'/reminder'} className="button button-primary"><Translate value="invitePage.remindMeButton" /></Link>
          <br/>&nbsp;
          <FacebookProvider appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'}>
            <Like reference="party" width="300" showFaces share href="http://kalas.io"/>
          </FacebookProvider>        <br/>&nbsp;
        </div>
      </div>  
      :''}
      {invite.inviteStatus!='INVITED'?
      <div className={"frame inviteFrame-"+(party.theme?party.theme:"polka")}>
        <div><Translate value="invitePage.comments" /></div>
        <FacebookProvider onReady={this.fbReady} appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'}>
          <Comments href={"http://" + location.host + "/fromComments/" +party.id} orderBy="time" numPosts={10}/>
        </FacebookProvider>
      </div>
      :''}
      {invite.inviteStatus=='ACCEPTED'?
      <InvitesIndex showPhone={false}/>
      :''}
      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { invite: state.invites.invite, party: state.parties.party, locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getInvite, getParty, acceptInvite, rejectInvite })(withDataLayerPageView(InviteShow));
