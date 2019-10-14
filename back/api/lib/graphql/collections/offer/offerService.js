'use strict';

const offers =[
  // {
  //   id:'laserdomeMalmo',
  //   company: 'Laserdome',
  //   texts : {
  //     sv: {
  //       offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas, så får du rabatt på ditt nästa %{company}-kalas.'
  //     },
  //     en: {
  //       offerText: 'EN: Klicka på länken igen efter %{birthdayChild}s kalas, så får du rabatt på ditt nästa %{company}-kalas.'
  //     }
  //   }, 
  //   url: 'https://boka.kalas.io/erbjudande/laserdomeMalmo',
  //   locationRegex: /laserdome.*malm|drottning.*$/gi
  // },
  {
    id: 'default',
    company: 'PARTYKUNGEN',
    texts : {
      sv: {
        offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas så får du 10% rabatt på %{company} inför ditt nästa kalas.',
        hostText: 'I samarbete med %{company} kan vi erbjuda allt du behöver inför kalaset, med 10% rabatt. %{url}'
      },
      en: {
        offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas så får du 10% rabatt på %{company} inför ditt nästa kalas.',
        hostText: 'I samarbete med %{company} kan vi erbjuda allt du behöver inför kalaset, med 10% rabatt. %{url}'
      }
    }, 
    url: 'https://boka.kalas.io/erbjudande/partykungen',
    locationRegex: /.*/gi
  }
  
]

function identifyOffer(party){
  console.log(offers);
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    if (offer.locationRegex.test(party.partyLocation)) {
      console.log("offer match:" + offer.id + ' partyLocation: ' + party.partyLocation);
      return offer;
    }
  }
}

function replaceInText(translation,replacements){
  Object.keys(replacements).forEach(replacement => {
    translation = translation.split(`%{${replacement}}`).join(replacements[replacement]);
  });
  return translation;
}

module.exports = {
  getOfferText(party){
    var offer = identifyOffer(party);
    if(offer){
      return replaceInText(offer.texts[party.locale].offerText,{'company':offer.company,
                                                                'birthdayChild':party.childName});
    } else {
      return "";
    }
    
  } ,
  getHostOfferText(party){
    var offer = identifyOffer(party);
    if(offer&&offer.texts[party.locale].hostText){
      return replaceInText(offer.texts[party.locale].hostText,{'company':offer.company,
                                                                'url':offer.url});
    } else {
      return "";
    }
    
  } ,
  getOffer(party){
    return identifyOffer(party);
  }
}
