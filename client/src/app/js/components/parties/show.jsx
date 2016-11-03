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
import DropDownList from 'react-widgets/lib/DropdownList';

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

class PartiesShow extends Component {
  componentWillMount() {
    this.props.getParty(this.props.params.id);
  }

  setTheme(theme){
    this.props.setThemeOnParty(this.props.party.id,theme);
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
    const themes=[{id:'polka',
                  name:I18n.t('theme.polka')},
                  {id:'bowling',
                  name:I18n.t('theme.bowling')},
                  {id:'ladybug',
                  name:I18n.t('theme.ladybug')}
                ];
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
          <h2><Translate value="createPartyPage.step2" /></h2>
          <h3><Translate value="createPartyPage.step2_description" /></h3>
          <DropDownList defaultValue={"polka"} value={party.theme} valueField='id' textField='name' data={themes}  onChange={value => this.setTheme(value.id)}/>
        </div>
        :''}
        <InvitesIndex />
        {!invites||invites.length==0?
          (<div>
            <h2><Translate value="createPartyPage.step3" /></h2>
            <h3><Translate value="createPartyPage.step3_description" /></h3>
          </div>)
          :
          (<div>
            {anyoneHasReplied?
            <div className={"frame inviteFrame-"+(party.theme?party.theme:"polka")}>
              <div><Translate value="createPartyPage.comments" /></div>
              <FacebookProvider onReady={fbReady} appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'}>
                <Comments href={"http://" + location.host + "/fromComments/" +party.id} orderBy="time" numPosts={10}/>
              </FacebookProvider>

            </div>
            :''}
            <h3><Translate value="createPartyPage.inviteMoreChildren" /></h3>
          </div>)
        }

        <InvitesNew/>
        <div className={"frame inviteFrame-"+(party.theme?party.theme:"polka")}>
          <h5><Translate value="createPartyPage.youreDone" /></h5>
          <h5><Translate value="createPartyPage.youGetAText" /></h5>
          <FacebookProvider appID="1114268925305216" language={locale=='sv'?'sv_SE':'en_GB'} >
            <Like reference="party" width="300" showFaces share href="http://kalas.io"/>
          </FacebookProvider>
          <br/>&nbsp;
          <Link to='parties/my' className="button button-primary"><Translate value="createPartyPage.seeAllParties" /></Link>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { party: state.parties.party,invites: state.invites.all, currentUser: state.users.currentUser,locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getParty,updateParty,setThemeOnParty})(PartiesShow);
