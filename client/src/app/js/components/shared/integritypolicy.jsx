import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router";
import {throwError} from '../../actions/error';
import { Translate,I18n} from 'react-redux-i18n';
const imageSource = require('./images/kalasLogo.png');


class IntegrityPolicyPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props) {
    super(props);
  }

  render() {
   
    return (
      <div>
          <div className="section">
            <div className="row first">
              <div className="twelve columns">
                <img src={imageSource} className="logo"/>
                <h4 className="logo-heading"><Translate value="landingPage.heading" /></h4>
              </div>
            </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Varför ska jag läsa denna policy?</h4>
            <p className="description">Denna policy beskriver hur vi på Kalas.io samlar in, använder och skyddar dina personuppgifter.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Vilken information samlar ni in om mig?</h4>
            <div className="description">
              Vi samlar in information som hjälper oss att tillhandahålla en tjänst till dig, det inkluderar:
              <br/>
              Om du skapar ett konto:<br/>

              <ul>
                <li>Förnamn</li>
                <li>Efternamn</li>
                <li>Mobilnummer</li>
              </ul>
              Om du (eller ditt barn) blir inbjuden till ett kalas:<br/>

              <ul>
                <li>Förnamn</li>
                <li>Mobilnummer</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Hur kommer ni använda min information?</h4>
            <p className="description">Vi behöver veta en del om dig för att kunna förse dig med en inbjudan enligt önskemål från den som bjudit in dig, eller ditt barn och i linje med denna övergripande policy. Vi kommer inte samla in mer information än vi behöver för att tillhandahålla våra tjänster till dig.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Hur länge kommer ni ha min information?</h4>
            <p className="description">Vi har uppföljningskrav som gör att vi behöver hålla en del av din information i upp till ett år, därefter så kommer den raderas. Information som vi använder för marknadsföring kommer behållas fram tills den tidpunkt du själv väljer att tacka nej till den.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Vilka delar ni min information med?</h4>
            <p className="description">Dina personuppgifter kan komma att hanteras av vår personal och i vissa fall personal hos den kalasarrangör som anordnar kalaset , ingen tredje part har tillgång till dina personuppgifter så länge inte lagen kräver att vi delar den.

            <br/>
            Vi har rutiner på plats för att säkerställa att dina personuppgifter hanteras i tryggt och säkert enlighet med gällande lagstiftning. Mer information kan du få genom att kontakta oss via e-post.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Var har ni min information?</h4>
            <p className="description">Din information lagras i datacenter inom den Europeiska Unionen. Av tekniska skäl så kan våra underleverantörer behöva flytta information till andra länder utanför EU. Om detta sker så används lämpliga skyddsåtgärder och standardiserade dataskyddsbestämmelser som godkänts av EU-kommissionen.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Vad är mina rättigheter?</h4>
            <p className="description">
            <b>Rätt till information:</b> Du kan begära att få en kopia på de personuppgifter vi har om dig.
            <br/><br/><b>Rätt till rättelse:</b> Vi vill säkerställa att din information är uppdaterad och korrekt. Du kan begära att få din information rättad eller borttagen om du anser att den är inkorrekt.
            <br/><br/><b>Rätt till radering:</b> Du kan begära att vi ska radera dina personuppgifter. Vi får inte radera uppgifter som lagen kräver att vi behåller.
            <br/><br/><b>Ta tillbaka samtycke:</b> Du kan ta tillbaka ditt samtycke till att dela din information eller att ta emot marknadsföring / utskick när som helst. Antingen genom att avprenumerera från meddelandet eller kontakta oss via e-post.
            <br/><br/><b>Klagomål:</b> Du kan kan lämna ett klagomål till datainspektionen om du anser att vi behandlar dina personuppgifter i strid med dataskyddsförordningen.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Hur kan jag använda mina rättigheter?</h4>
            <p className="description">Om du vill använda någon av dina rättigheter så kontaktar du oss via e-post som finns längst ned i denna policy. Om du vill lämna ett klagomål till datainspektionen så behöver du kontakta dem.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Uppdateringar till denna policy</h4>
            <p className="description">Vi kan komma att uppdatera denna policy och kommer då publicera dem på denna webbsida. Denna policy uppdaterades senast den 27 Oktober 2018.</p>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <h4>Hur kan jag kontakta er?</h4>
            <p className="description">Om du har några frågor angående denna policy eller hur vi använder din information, eller dina rättigheter så kan du kontakta oss på följande adress:
            <br/>
            <a href="mailto:info@kalas.io">info@kalas.io</a>
            </p>
          </div>
        </div>
      </div>
      
  );
  }
}
function mapStateToProps(state) {
  return {locale: state.i18n.locale};
}

export default connect(mapStateToProps, { throwError })(IntegrityPolicyPage);
