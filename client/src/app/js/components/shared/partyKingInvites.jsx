
import React, { Component } from 'react';

module.exports = class PartyKingInvites extends React.Component {
    createPartyKingMarkup(){
        return {__html: "<div style='width:100%; max-width:600px; text-align: center; margin:0 auto' id='adtCollageMakerCode_8rcpx'><img style='width:100%; margin-bottom:20px' src='//collagemaker.s3.amazonaws.com/c4552ad1-a4ff-43d0-8368-8f2c04768ea2.png'/><a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/day-of-the-dead-inbjudningskort.html'/>Day of the Dead Inbjudningskort - 8-pack</a> | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-frozen.html'/>Inbjudningskort Frozen - 6-pack</a> | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-super-mario.html'/>Inbjudningskort Super Mario - 8-pack</a> | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-cupcake.html'/>Inbjudningskort Cupcake - 6-pack</a> | </div>"};
    }
    render(){
        return (
            
            <div className="section">
                <h4 className="heading">Vill du hellre skicka fysiska inbjudningskort? </h4>
                <div dangerouslySetInnerHTML={this.createPartyKingMarkup()} />
                <p className="description">Vi ger dig 10% rabatt på partykungens sortiment. Använd koden <b>KALAS.IO</b></p>
            </div>

        );
    }
  };