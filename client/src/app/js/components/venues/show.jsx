import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getParty} from '../../actions/parties';
import { Link } from 'react-router';

import { Translate,I18n} from 'react-redux-i18n';
import ga from 'ga-react-router';



class VenuesShow extends Component {
  componentWillMount() {
    //this.props.getVenue(this.props.params.id);
  }



  render() {
    //const { venue } = this.props;
    const venues = {laserdome:{name:"Laserdome",
    url:"http://goteborg.laserdome.se/barn-ungdom/",
    image:"http://goteborg.laserdome.se/wp-content/themes/laserdome/img/logo.png"},
    john:{name:"John Scotts",
    url:"http://johnscotts.se/partille/barnkalas/",
    image:"http://johnscotts.se/partille/wp-content/uploads/sites/13/2016/08/JS_PARTILLE_web.png"}

                  };
    const venue = venues.john;
    const {locale} = this.props;
    if (!venue) {
      return <div className="twelve columns"><Translate value="general.loading" /></div>
    }
    return (
      <h5>
        Snart dags för ditt eget barn att ha kalas?<br/>
        Skulle du vilja boka på {venue.name} du också?<br/>&nbsp;<br/>
        <a onClick={() => ga('send', {
          hitType: 'event',
          eventCategory: 'Venue',
          eventAction: 'ClickImage',
          eventLabel: venue.name
        })} href={venue.url}><img src={venue.image} style={{width:"300px"}}/></a><br/>&nbsp;<br/>
        <a onClick={() => ga('send', {
          hitType: 'event',
          eventCategory: 'Venue',
          eventAction: 'ClickLink',
          eventLabel: venue.name
        })} href={venue.url}>Klicka här för mer information</a><br/>
      </h5>

    );
  }
}

function mapStateToProps(state) {
  return { locale: state.i18n.locale};
}

export default connect(mapStateToProps, { getParty })(VenuesShow);
