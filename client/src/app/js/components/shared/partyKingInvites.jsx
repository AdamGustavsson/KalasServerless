
import React, { Component } from 'react';
const imageSource = require('./images/collage.jpg');

module.exports = class PartyKingInvites extends React.Component {
    render(){
        return (
            
            <div className="section">
                <h4 className="heading">Vill du hellre skicka fysiska inbjudningskort? </h4>
                <div>
                    <div style={{width:'100%', maxWidth:'600px', textAlign: 'center', margin:'0 auto'}} id='adtCollageMakerCode_8rcpx'>
                        <img style={{width:'100%', marginBottom:'20px'}} src={imageSource}/>
                        <a href="https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/day-of-the-dead-inbjudningskort.html">Day of the Dead Inbjudningskort - 8-pack</a> 
                        | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-frozen.html'>Inbjudningskort Frozen - 6-pack</a> 
                        | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-super-mario.html'>Inbjudningskort Super Mario - 8-pack</a> 
                        | <a href='https://track.adtraction.com/t/t?a=1280241905&as=1319927245&t=2&tk=1&url=https://www.partykungen.se/inbjudningskort-cupcake.html'>Inbjudningskort Cupcake - 6-pack</a> | 
                    </div>
                </div>
                <p className="description">Vi ger dig <b>20% rabatt</b> på partykungens sortiment. Använd koden <b>KALAS.IO</b></p>
            </div>

        );
    }
  };