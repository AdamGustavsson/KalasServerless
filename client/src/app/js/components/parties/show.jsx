import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getParty,updateParty,setThemeOnParty } from '../../actions/parties';
import { Link } from 'react-router';
import InvitesIndex from '../invites/index';
import InvitesNew from '../invites/new';
import { Translate,I18n} from 'react-redux-i18n';
const flagSource = require('../invites/images/party-flags.png');
import ga from 'ga-react-router';
import FacebookProvider, { Like,Comments } from 'react-facebook';
import Helmet from "react-helmet";
import ThemedInvite from '../invites/themes/themedInvite';
import PaymentModule from '../payment/paymentModule';
import DropDownList from 'react-widgets/lib/DropdownList';
import Moment from 'moment';
import withDataLayerPageView from '../shared/withDataLayerPageView';

function fbReady(){
  window.FB.Event.subscribe('comment.create',
        function(response) {
            console.log('A new comment has been added!');
            ga('send', {
              hitType: 'event',
              eventCategory: 'Comment',
              eventAction: 'CommentCreate',
              eventlabel: 'CommentCreateOnPartyPage'
            });
        }
    );

}
function getThemeABPrice(userNumber){
  var a = 9;
  var b = 19;
  if(!userNumber){
    return a;
  }
  userNumber = userNumber + '';
  const thirdLastDigit = userNumber.charAt(userNumber.length - 3);
  if(thirdLastDigit<5){
    return a;
  } else {
    return b;
  }
}
function getThemeABPaymentMethod(userNumber){
  var a = "Swish";
  var b = "Payson kreditkort/direktbetalning";
  if(!userNumber){
    return a;
  }
  userNumber = userNumber + '';
  const nextLastDigit = userNumber.charAt(userNumber.length - 2);
  if(nextLastDigit<5){
    return a;
  } else {
    return b;
  }
}


class PartiesShow extends Component {
  componentWillMount() {
    this.props.getParty(this.props.params.id);
  }

  setTheme(theme){
    this.props.setThemeOnParty(this.props.party.id,theme.id);
    //do stuff if a paid theme is selected
    if(theme.paid){
        ga('send', {
          hitType: 'event',
          eventCategory: 'Party',
          eventAction: 'SelectPaidTheme',
          label: theme.id
        });
    } else {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'SelectFreeTheme',
        label: theme.id
      });
    }

    ga('send', {
      hitType: 'event',
      eventCategory: 'Party',
      eventAction: 'SelectTheme',
      label: theme.id
    });
    this.topFunction();
  }
  topFunction() {
    window.scrollTo({top:0,behavior:'smooth'});
    document.body.scrollTop = 0; // For Safari

  }
  updatePartyField(party){
    if(party.startDateTime){
      const parsed = Moment(party.startDateTime, 'YYYY-MM-DD HH:mm');
      if (!parsed.isValid()){
        return
      }

      party.startDateTimeUnix=parsed.unix();
    }
    party.id = this.props.party.id;
    this.props.updateParty(party);
  }

  render() {
    const { party } = this.props;
    const { currentUser } = this.props;
    const {invites } = this.props;
    const {locale} = this.props;
    const {isThemePaidFor} = this.props;

    //Check if anyone has replied yet, used to know if the comments function should be shown
    var anyoneHasReplied = false;
    if(invites&&invites.length>0){
      invites.map(invite => {
        if(invite.inviteStatus!="INVITED"){
          anyoneHasReplied=true;
        }
      })
    }
    if (!party) {
      return <div className="row"><div className="twelve columns"><Translate value="general.loading" /></div></div>
    }
    ga('set', 'userId', party.hostUser);

    const themeABPrice = getThemeABPrice(party.hostUser);
    const themeABPaymentMethod = getThemeABPaymentMethod(party.hostUser);
    if(invites.length==1){
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'ThemeChosenPaymentOffered',
        eventLabel: themeABPaymentMethod,
        eventValue: themeABPrice
      });
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'ThemeChosen',
        eventLabel: (party.theme?party.theme:'cake'),
        eventValue: themeABPrice
      });
    }
    if(invites.length==0){
      ga('send', {
        hitType: 'event',
        eventCategory: 'Party',
        eventAction: 'PaymentOfferedFor'+themeABPrice,
        eventLabel: themeABPaymentMethod,
        eventValue: themeABPrice
      });
    }
    const themes={cake: {id:'cake',
                  name:I18n.t('theme.cake',{price:'2̶9̶k̶r̶, nu '+themeABPrice}),paid:true,price:themeABPrice},
                  ticket: {id:'ticket',
                  name:I18n.t('theme.ticket',{price:'2̶9̶k̶r̶, nu '+themeABPrice}),paid:true,price:themeABPrice},
                  banner: {id:'banner',
                  name:I18n.t('theme.banner',{price:'2̶9̶k̶r̶, nu '+themeABPrice}),paid:true,price:themeABPrice},
                  pirate: {id:'pirate',
                  name:I18n.t('theme.pirate',{price:29}),paid:true,price:29},
                  polka:{id:'polka',
                  name:I18n.t('theme.polka')},
                  ladybug:{id:'ladybug',
                  name:I18n.t('theme.ladybug')},
                  laser:{id:'laser',
                  name:I18n.t('theme.laser')},
                  bowling:{id:'bowling',
                  name:I18n.t('theme.bowling')},
                  music:{id:'music',
                  name:I18n.t('theme.music')},
                  prison:{id:'prison',
                  name:I18n.t('theme.prison')}
                };
       
    return (
      <div className="row">
      <Helmet
        title={I18n.t('createPartyPage.title')}
        meta={[
              {"name": "robots", "content": "noindex,nofollow"}
            ]}
      />
        <ThemedInvite party={party} locale={locale} updatePartyField={this.updatePartyField.bind(this)} editEnabled={!invites||invites.length==0}/>
        {!invites||invites.length==0?
        <div>
          <h5><Translate value="createPartyPage.editChanges" /></h5>
          <h3><Translate value="createPartyPage.step2" /></h3>
          <h5><Translate value="createPartyPage.step2_description" /></h5>
          <DropDownList placeholder={I18n.t('createPartyPage.select')} defaultValue={"cake"} value={party.theme} valueField='id' textField='name' data={Object.values(themes)}  onChange={value => this.setTheme(value)}/>
          <PaymentModule theme={themes[(party.theme?party.theme:"cake")]}  paymentMethod={themeABPaymentMethod} isDefault={party.theme===null}/>
        </div>
        :''}
        <InvitesIndex showPhone={true}/>
        {!invites||invites.length==0?
          (<div>
            <h3><Translate value="createPartyPage.step3" /></h3>
            <h5><Translate value="createPartyPage.step3_description" /></h5>
          </div>)
          :
          (<div>
            {anyoneHasReplied?
            <div className={"frame inviteFrame-"+(party.theme?party.theme:"cake")}>
              <div><Translate value="createPartyPage.comments" /></div>
              <FacebookProvider onReady={fbReady} appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'}>
                <Comments href={"https://" + location.host + "/fromComments/" +party.id} orderBy="time" numPosts={10}/>
              </FacebookProvider>

            </div>
            :''}
            <h3><Translate value="createPartyPage.inviteMoreChildren" /></h3>
          </div>)
        }
        {party.theme&&themes[party.theme].paid&&!isThemePaidFor?
          <div><Translate value="createPartyPage.pleasePay" /></div>
        :<InvitesNew theme={party.theme}/>}
        <div className={"frame inviteFrame-"+(party.theme?party.theme:"cake")}>
          <h5><Translate value="createPartyPage.youreDone" /></h5>
          <h5><Translate value="createPartyPage.youGetAText" /></h5>
          <FacebookProvider appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'} >
            <Like reference="party" width="300" showFaces share href="https://kalas.io"/>
          </FacebookProvider>
          <br/>&nbsp;
          <Link to='/parties/my' className="u-pull-right button button-primary"><Translate value="createPartyPage.seeAllParties" /></Link><br/>&nbsp;
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { isThemePaidFor:state.payment.isThemePaidFor, party: state.parties.party,invites: state.invites.all, currentUser: state.users.currentUser,locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getParty,updateParty,setThemeOnParty})(withDataLayerPageView(PartiesShow));
