'use strict';
const db = require('../api/lib/dynamodb');
const invitesTable = 'serverless-graphql-invites-prod';
const partiesTable = 'serverless-graphql-parties-prod';

var invitedUsers = [];
var hostUsers = [];
var viralUsers = 0;
var properParties = 0;
var months = process.argv.slice(2).pop();


function getInvitesFromLastXMonths(x) {

    var d = new Date();
    d.setMonth(d.getMonth() - x);
    var unix = Math.round(+d/1000)
    console.log(unix);
    return db('scan', {
      TableName: invitesTable,
      FilterExpression: "createDateTimeUnix > :unix ",
      ExpressionAttributeValues: {':unix':unix}
    }).then(invites => processInvites(invites,x));
}

function getPartiesFromLastXMonths(x) {

    var d = new Date();
    d.setMonth(d.getMonth() - x);
    var unix = Math.round(+d/1000)
    console.log(unix);
    return db('scan', {
      TableName: partiesTable,
      FilterExpression: "startDateTimeUnix > :unix ",
      ExpressionAttributeValues: {':unix':unix}
    }).then(parties => processParties(parties));
}

function processInvites(invites,months){
    invites.Items.forEach(invite => {
        var cleanedNumber = invite.mobileNumber.replace(/\s/g, '').replace('-','').replace('+46','0').trim();
        invite.mobileNumber = cleanedNumber
        
    });
    invitedUsers = invites.Items;
    getPartiesFromLastXMonths(months)

}
function processParties(parties){
    console.log('processing parties')
    parties.Items.forEach(party => {
        var cleanedNumber = party.hostUser.replace(/\s/g, '').replace('-','').replace('+46','0').trim();
        party.hostUser = cleanedNumber
        party.noOfInvites = 0
        invitedUsers.forEach(invite => {
            if (party.hostUser==invite.mobileNumber&&
                party.id!=invite.partyId&&
                party.startDateTimeUnix>invite.createDateTimeUnix) {
                //console.log("match:");
                //console.log(party);
                //console.log(invite);
                viralUsers++
                party.viral= true;
            }
            if(party.id===invite.partyId){
                party.noOfInvites++
            }
        });
        if(party.noOfInvites>3){
            party.proper = true;
            properParties++

        } else if(party.viral===true){
            viralUsers--
        }
    });
    var virality= viralUsers/invitedUsers.length
    console.log("Viral users:" +viralUsers)
    console.log("Invited users:" +invitedUsers.length)
    console.log("Parties:" +parties.Items.length)
    console.log("Proper parties:" +properParties)
    console.log("Invites/proper party:" +invitedUsers.length/properParties)
    console.log("Virality:" +virality)
    console.log("Each new proper party generates X new parties:" +virality*invitedUsers.length/properParties)
}

getInvitesFromLastXMonths(months)