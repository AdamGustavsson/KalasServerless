'use strict';
const db = require('../api/lib/dynamodb');
const invitesTable = 'serverless-graphql-invites-prod';
const partiesTable = 'serverless-graphql-parties-prod';
const timeIndex= 'inviteStatus-partyDateTimeUnix-index';

var invitedUsers = [];
var invitedUsersThisMonth =0;
var hostUsers = [];
var viralUsers = 0;
var properParties = 0;
var properPartiesThisMonth = 0;
var properInvitesThisMonth =0;
var months = process.argv.slice(2).pop();


function getInvitesFromLastXMonths(x) {

    var d = new Date();
    d.setMonth(d.getMonth() - x);
    console.log(d);
    var unix = Math.round(+d/1000)
   //console.log(unix);
    var acceptedPromis = db('query', {
      TableName: invitesTable,
      IndexName:timeIndex,
      KeyConditionExpression: "inviteStatus= :statusValue and partyDateTimeUnix > :unix ",
      ExpressionAttributeValues: {':statusValue':'ACCEPTED',':unix':unix}
    });
    var rejectedPromise = db('query', {
        TableName: invitesTable,
        IndexName:timeIndex,
        KeyConditionExpression: "inviteStatus= :statusValue and partyDateTimeUnix > :unix ",
        ExpressionAttributeValues: {':statusValue':'REJECTED',':unix':unix}
    });
    var invitedPromise = db('query', {
        TableName: invitesTable,
        IndexName:timeIndex,
        KeyConditionExpression: "inviteStatus= :statusValue and partyDateTimeUnix > :unix ",
        ExpressionAttributeValues: {':statusValue':'INVITED',':unix':unix}
    });
    Promise.all([acceptedPromis, rejectedPromise, invitedPromise]).then(invites => processInvites(invites,x));
}

function getPartiesFromLastXMonths(x) {

    var ds = new Date();
    ds.setMonth(ds.getMonth() - x);
    var unixStart = Math.round(+ds/1000);
    return db('scan', {
      TableName: partiesTable,
      FilterExpression: "startDateTimeUnix > :unixStart ",
      ExpressionAttributeValues: {':unixStart':unixStart}
    }).then(parties => processParties(parties));
}

function processInvites(invites,months){
    var ds = new Date();
    ds.setMonth(ds.getMonth() - months + 1);
    console.log(ds);
    var unixEnd = Math.round(+ds/1000);
    var allInvites = [];
    console.log(invites[0].Items.length);
    console.log(invites[1].Items.length);
    console.log(invites[2].Items.length);
    allInvites = allInvites.concat(invites[0].Items);
    allInvites = allInvites.concat(invites[1].Items);
    allInvites = allInvites.concat(invites[2].Items);
    console.log(allInvites.length);
    allInvites.forEach(invite => {
        var cleanedNumber = invite.mobileNumber.replace(/\s/g, '').replace('-','').replace('+46','0').trim();
        invite.mobileNumber = cleanedNumber
        //console.log(invite.mobileNumber);
        if(invite.partyDateTimeUnix<unixEnd){
            invitedUsersThisMonth++;
        }
    });
    invitedUsers = allInvites;
    console.log(invitedUsers.length);
    getPartiesFromLastXMonths(months)

}
function processParties(parties){
    var ds = new Date();
    ds.setMonth(ds.getMonth() - months + 1);
    var unixEnd = Math.round(+ds/1000);
    console.log('processing parties')
    parties.Items.forEach(party => {
        var cleanedNumber = party.hostUser.replace(/\s/g, '').replace('-','').replace('+46','0').trim();
        party.hostUser = cleanedNumber
        party.noOfInvites = 0
        invitedUsers.forEach(invite => {
            if (party.hostUser==invite.mobileNumber&&
                party.id!=invite.partyId&&
                party.startDateTimeUnix>invite.createDateTimeUnix&&
                invite.createDateTimeUnix<unixEnd) {
                //console.log("match:");
                //console.log(party);
                //console.log(invite);
                viralUsers++
                party.viral= true;
            }
            if(party.id===invite.partyId){
                party.noOfInvites++;
            }
        });
        //console.log(party.noOfInvites);
        if(party.startDateTimeUnix<unixEnd&&
            party.noOfInvites>3){
            properPartiesThisMonth++;
        }
        if(party.noOfInvites>3){
            party.proper = true;
            properParties++;

        } else if(party.viral===true){
            viralUsers--;
        }
    });
    parties.Items.forEach(party => {
        if(party.proper&&party.startDateTimeUnix<unixEnd){
            invitedUsers.forEach(invite => {
                if(party.id===invite.partyId){
                    properInvitesThisMonth++;
                }
            });
        }
    }); 
    var virality= viralUsers/properInvitesThisMonth;
    console.log("Viral users:" +viralUsers)
    console.log("Invited users this month:" +invitedUsersThisMonth)
    console.log("Parties:" +parties.Items.length)
    console.log("Proper parties this month:" +properPartiesThisMonth)
    console.log("Proper invites this month:" +properInvitesThisMonth)
    console.log("Proper Invites/proper party:" +properInvitesThisMonth/properPartiesThisMonth)
    console.log("Virality:" +virality)
    console.log("Each new proper party generates X new parties:" +viralUsers/properPartiesThisMonth)
}

getInvitesFromLastXMonths(months)