//Send email variables

const sgMail = require('@sendgrid/mail')
const fs = require("fs");
const API_KEY =
    '';

sgMail.setApiKey(API_KEY)

//Take API  values

const { assert } = require('console');
var http = require('http');
var asset = {
    host: 'my-json-server.typicode.com',
    path: '/tractian/fake-api/assets/'
}
var users = {
    host: 'my-json-server.typicode.com',
    path: '/tractian/fake-api/users/'
}

function takingdata (url){
    return new Promise((resolve, reject) => {
        var request = http.request(url, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
    })
    
}

async function filterstatus (){
    const assetResult = await takingdata(asset);
        
    const dat = JSON.parse(assetResult);
    return dataFilter = dat.filter(element => element.status == 'inAlert' || element.status == 'inDowntime')
    
}
async function filteruser (){
    const userResult = await takingdata(users);
    const dat = JSON.parse(userResult);
    
    return dat
}

async function getfirstclient(){
    const assetUser = await filteruser();
    const assetStatus = await filterstatus();
    firstclient = assetStatus.filter(element => element.unitId == 1 && element.companyId == 1)
    let firstemail= (assetUser.filter(element => element.unitId == 1 && element.companyId == 1)).map(a=> a.email);
    firstclientString =  JSON.stringify(firstclient);
    csv = firstclient.map(row => Object.values(row));
    csv.unshift(Object.keys(firstclient[0]));
    sd = csv.join('\n');
    fs.writeFileSync("data.csv", sd);
    const firstmessage = {
        
        to: firstemail,
        from:'viteriesteban@gmail.com',
        subject: 'Email alert to',
        text: 'Hello attached to this email is a csv file with the assets that are in Alert or in Downtime',
        html:'<h1> Hello from Tractian</h1>',
        attachments: [
            {
              content: fs.readFileSync(`${__dirname}/data.csv`).toString("base64"),
              filename: "assets.csv",
              type: "text/csv",
              disposition: "attachment"
            }
          ]
    };
    console.log(sd); 
    sgMail
        .send(firstmessage)
        .then((response) => console.log('Email Sent....'))
        .catch((error) => console.log(error.message));
}
async function getsecondclient(){
    const assetUser = await filteruser();
    const assetStatus = await filterstatus();
    secondclient = assetStatus.filter(element => element.unitId == 2 && element.companyId == 1)
    let secondemail= (assetUser.filter(element => element.unitId == 2 && element.companyId == 1)).map(a=> a.email);
    csv = secondclient.map(row => Object.values(row));
    csv.unshift(Object.keys(secondclient[0]));
    sd = csv.join('\n');
    fs.writeFileSync("data2.csv", sd);
    const secondmessage = {
        
        to: 'fr_estebanvl@hotmail.com',
        from:'viteriesteban@gmail.com',
        subject: 'Email alert from Tractian',
        text: 'Hello attached to this email is a csv file with the assets that are in Alert or in Downtime',
        html:'<h1> Hello from Tractian</h1> <p>Here’s an alert generated because some assets are in Downtime or in Alert. Attached to this email is a csv file with more information</p>',
        attachments: [
            {
              content: fs.readFileSync(`${__dirname}/data2.csv`).toString("base64"),
              filename: "assets.csv",
              type: "text/csv",
              disposition: "attachment"
            }
          ]
    };
    console.log(sd); 
    sgMail
        .send(secondmessage)
        .then((response) => console.log('Email Sent....'))
        .catch((error) => console.log(error.message));
}
getsecondclient();
