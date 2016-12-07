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
    image:"http://goteborg.laserdome.se/wp-content/themes/laserdome/img/logo.png",
    text:"Uppge koden KALAS.IO när du bokar för att få 10% i rabatt på ditt eget kalas"},
    palatset:{name:"Barnpalatset",
    url:"http://barnpalatset.com/kalas/",
    image:"http://media2.barnpalatset.com/2013/09/logga.png",
    text:"Boka på 031-43 39 66. Uppge koden KALAS.IO när du bokar så går ett av barnen in gratis"},
    john:{name:"John Scotts",
    url:"http://johnscotts.se/partille/barnkalas/",
    image:"http://johnscotts.se/partille/wp-content/uploads/sites/13/2016/08/JS_PARTILLE_web.png",
    text:"Boka på 031–44 23 34. Uppge koden KALAS.IO för att uppgradera till Barnakalas - Silver utan extra kostnad"}

                  };
    const {venueName} = this.props;
    const venue = venues[venueName];
    const {locale} = this.props;
    if (!venue) {
      return <div className="twelve columns"><Translate value="general.loading" /></div>
    }
    return (
      <h5>
        Boka ditt nästa kalas på {venue.name} du också!<br/>&nbsp;<br/>
        {venue.text}<br/>&nbsp;<br/>
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
