'use strict';


function identifyOffer(party){
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
    //   locationRegex: /.*laserdome.*malm|.*laserdome.*drottning.*/gi
    // },
    {
      id:'prisonIslandBorlange',
      company: 'Prison Island',
      texts : {
        sv: {
          offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas, så får du 10% rabatt på ditt nästa kalas på Prison Island.'
        },
        en: {
          offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas, så får du 10% rabatt på ditt nästa kalas på Prison Island.'
        }
      }, 
      url: 'https://boka.kalas.io/erbjudande/PrisonIslandBorlange',
      locationRegex: /.*prison.*borlänge.*|.*prison.*borganäsv.*/gi
    },
    {
      id: 'default',
      company: 'PARTYKUNGEN',
      texts : {
        sv: {
          offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas så får du 20% rabatt på %{company} inför ditt nästa kalas.',
          hostText: 'I samarbete med %{company} kan vi erbjuda allt du behöver inför kalaset, med 20% rabatt. %{url}'
        },
        en: {
          offerText: 'Klicka på länken igen efter %{birthdayChild}s kalas så får du 20% rabatt på %{company} inför ditt nästa kalas.',
          hostText: 'I samarbete med %{company} kan vi erbjuda allt du behöver inför kalaset, med 20% rabatt. %{url}'
        }
      }, 
      url: 'https://boka.kalas.io/erbjudande/partykungen',
      locationRegex: /.*/gi
    }
    
  ]
  console.log(offers);
  for (let i = 0; i < offers.length; i++) {
    const offer = offers[i];
    if (offer.locationRegex.test(party.partyLocation)) {
      console.log("offer match:" + offer.id + ' partyLocation: ' + party.partyLocation);
      return offer;
    }
    else
    {
      console.log("offer did not match:" + offer.id + ' partyLocation: ' + party.partyLocation);
    }
  }
  console.log("No offers found. but returning default anyways");
  return offers.pop();
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
                                                                'birthdayChild':party.childName.trim()});
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
