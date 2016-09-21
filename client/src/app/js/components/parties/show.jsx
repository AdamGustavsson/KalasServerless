import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getParty } from '../../actions/parties';
import { Link } from 'react-router';
import InvitesIndex from '../invites/index';
import InvitesNew from '../invites/new';
import { Translate,I18n} from 'react-redux-i18n';
const flagSource = require('../invites/images/party-flags.png');
require('../invites/themes/polka.css');
import ga from 'ga-react-router';
import ReactFBLike from 'react-fb-like';
import Helmet from "react-helmet";
import ThemedInvite from '../invites/themes/themedInvite';

class PartiesShow extends Component {
  componentWillMount() {
    this.props.getParty(this.props.params.id);
  }
  componentWillUnmount() {
    document.body.className='';
  }

  render() {
    const { party } = this.props;
    const { currentUser } = this.props;
    const {invites } = this.props;
    const {locale} = this.props;


    if (!party) {
      return <div className="row"><div className="twelve columns"><Translate value="general.loading" /></div></div>
    }
    ga('set', 'userId', party.hostUser);

    return (
      <div className="row">
      <Helmet
        title={I18n.t('createPartyPage.title')}
        meta={[
              {"name": "robots", "content": "noindex,nofollow"}
            ]}
      />
        <ThemedInvite party={party} locale={locale}/>
        <InvitesIndex/>
        {!invites||invites.length==0?
          (<div>
            <h2><Translate value="createPartyPage.step2" /></h2>
            <h3><Translate value="createPartyPage.step2_description" /></h3>
          </div>)
          :
          (<h3><Translate value="createPartyPage.inviteMoreChildren" /></h3>)
        }

        <InvitesNew/>
        <h5><Translate value="createPartyPage.youreDone" /></h5>
        <h5><Translate value="createPartyPage.youGetAText" /></h5>
        <ReactFBLike language={locale=='sv'?'sv_SE':'en_GB'} appId="1114268925305216" href="http://kalas.io"/>

        <Link to='parties/my' className="button u-full-width"><Translate value="createPartyPage.seeAllParties" /></Link>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { party: state.parties.party,invites: state.invites.all, currentUser: state.users.currentUser,locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getParty })(PartiesShow);
