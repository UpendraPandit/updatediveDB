
const express = require('express');
const feedback = require('./Feedback');
const dbConnection = require('./pilot');
const passengers = require('./passenger');
const otp = require('./otp');
const app = express();

app.use(express.json());



const server = require('http').createServer(app);
const locationServer = require('http').createServer(app);
const WebSocket = require("ws");
const { json } = require('stream/consumers');
const wss = new WebSocket.Server({ server: server });
const wsForLiveLocation = new WebSocket.Server({ server: locationServer });
// const server = require('http').createServer(app);
// const WebSocket = require("ws");

// const wss = new WebSocket.Server({server:server});
// wss.on('connection',function connection(ws){
//     ws.send('Welcome new Client');
//     ws.on('message',function incoming(message){
//         ws.send('Got ur message its:'+ message);
//     });
// });

// app.get('/',(req,res)=>res.send('Hello World'));
// server.listen(3001,()=>console.log('Listening on port:3001'));

app.get('/getTheLengthOfids',async(req,res)=>{
 let l1 = Object.getOwnPropertyNames(webSockets);
 let l2 = Object.getOwnPropertyNames(pilotPassengerids);
 res.send(JSON.stringify('The webSockets length is:'+l1.length+3+'\nThe length of pilotPassengerids is:'+l2.length));

})



app.get('/deleteFromIds',async(req,res)=>{
  var phone = parseInt(req.query['phone']);
  delete pilotPassengerids[phone];
  res.send("Deleted");
});




app.get('/pilots', async (req, res) => {
  let data = await dbConnection();
  let ress = await data.find({}).toArray();
  res.send(ress);
});







app.get('/passengers/getpilot',async(req,res)=>{

  let data =  await dbConnection();
 let result = await data.aggregate([{
    '$geoNear': {        //This is for finding the destination. First we find common destination.
      'distanceField': 'distance',
      'key': 'polylineLocs',
      'maxDistance': 450,
      'spherical': true,
      'near': {
        'type': 'Point',
        'coordinates':
          [
               parseFloat(req.query['long']),
            parseFloat(req.query['lat'])
          ]
      },

    },
  },
  {
    '$match': {
      'location': {   // This is for finding nearby pilots at current location.
        '$geoWithin': {
          '$centerSphere': [[parseFloat(req.query['currLong']), parseFloat(req.query['currLat'])],0.155343/ 3963.189]
        },

    }
  }
  }]).toArray();
   if(result.length>0)
 {
 let passenger = await passengers();
 let passengersdata = await passenger.find({phone:parseInt(req.query['phone'])}).toArray();
 let passengerdataToSend = JSON.parse(JSON.stringify(passengersdata[0]));
      let pilotdataToSend = JSON.parse(JSON.stringify(result[0]));
const dataToSend={
        "passengerName":passengerdataToSend['name'],
        "passengerPhone":passengerdataToSend['phone'],
        "pilotPhone":pilotdataToSend['phone'],
        "passengerDestination":passengerdataToSend['destination'],
        "pilotDestination":pilotdataToSend['destination'],
        "passengerCurrentLocation":passengerdataToSend['currLoc'],
        "pilotCurrentLocation":pilotdataToSend['location']['coordinates'],
       "passengerDest":passengerdataToSend['dest'],
        "waypoint":pilotdataToSend['waypoint']
      }
pilotPassengerids[passengerdataToSend['phone']].send(JSON.stringify(dataToSend));
pilotPassengerids[pilotdataToSend['phone']].send(JSON.stringify(dataToSend));
 //wss.clients.forEach((client)=>{
// client.send(JSON.stringify('Hello'));
 //client.send(JSON.stringify(dataToSend));
//client.send("Data ayaela");
 res.send(dataToSend);
//})
 }

res.send("Successfully sent notification");
});


app.get('/accepted',(req,res)=>{
wss.clients.forEach((client)=>{
client.send(JSON.stringify({"pilot":parseInt(req.query['pilot']),"passenger":parseInt(req.query['passenger'])}));
});
res.send({"pilot":parseInt(req.query['pilot']),"passenger":parseInt(req.query['passenger'])});
})


pilotPassengerids={}
wss.on('connection', async (ws, req) => {
  ws.id = parseInt(req.url.split('/?phone=')[1]);
  pilotPassengerids[ws.id] = ws;
 
 ws.on('message', async (message) => {
     console.log(message.toString());
     console.log("Hello Flutter");
    console.log("sent");

 });


});







app.get('/passengers', async (req, res) => {
  let data = await passengers();
  let ress = await data.find({}).toArray();
  res.send(ress);
});




app.delete('/pilots/deleteUser',async(req,res)=>{
      let data = await dbConnection();
      let result = await data.deleteOne({
        phone:parseInt(req.query['phone'])
      });
      console.log(result);
      res.send( "User deleted");
})




app.delete('/passengers/deleteUser',async(req,res)=>{
  let data = await passengers();
  let result = await data.deleteOne({
    phone:parseInt(req.query['phone'])
  });
  console.log(result);
  res.send( "User deleted");
});


app.put('/passengers/updateUser', async (req, res) => {
  let data = await passengers();
  let ress = await data.updateOne(
    { phone: parseInt(req.query['phone']) },
    { $set: { currLoc: req.query['src'], destination: req.query['dest'] } }
  );
  if(ress.acknowledged)
  {
    res.send("passenger updated");
  }
  else
  {
    res.send("passenger Not Updated");
  }

});



app.get('/passengers/getNearestPilots',async (req,res)=>{
  let data = await dbConnection();
  let result = await data.find({
    'polylineLocs': {
      '$nearSphere': {
        '$geometry': {
          'type': 'Point', 
          'coordinates': 
          [78.052717,
           30.296711]
        }, 
        '$maxDistance': 250, 
        '$minDistance': 0
      }
    }
  },
  {
    'location': {
      '$nearSphere': {
        '$geometry': {
          'type': 'Point', 
          'coordinates': [
            parseFloat(req.query['long']),parseFloat(req.query['lat'])
          ]
        }, 
        '$maxDistance': 100, 
        '$minDistance': 0
      }
    }
  }).toArray();
    dispatch(result[0]);
  console.log(result);
  res.send(result); 
});











app.post('/feedback/crossFeedback', async (req, res) => {

  let data = await feedback();
  let ress = await data.insertOne(req.body);
  if (ress.acknowledged) {
    res.send('Feedback Sent');

  }
  else {
    res.send('Feedback not submitted');

  }

});


app.post('/otp/postOTP', async (req, res) => {

  let data = await otp();
  let ress = await data.insertOne(req.body);
  if(ress.acknowledged) {
    res.send('OTP Sent');
  }
  else {
    res.send('OTP not sent');

 }
});



app.get('/otp/validateOTP', async (req, res) => {

  let data = await otp();
  let ress = await data.find({pilot:parseInt(req.query['pilot']),passenger:parseInt(req.query['passenger']),otp:parseInt(req.query['otp'])}).toArray();
  if(ress.length>0) {
    res.send(true);

  }
  else {
    res.send(false);

 }
});


app.delete('/otp/deleteOTP', async (req, res) => {

  let data = await otp();
  let ress = await data.deleteOne({pilot:parseInt(req.query['pilot']),passenger:parseInt(req.query['passenger']),otp:parseInt(req.query['otp'])}).toArray();
  res.send('deleted');

  
});


app.put('/pilots/updateUser', async (req, res) => { //To update a pilot in the mongodb Database
  let data = await dbConnection();
 
  let ress = await data.updateOne(
    { phone: parseInt(req.body['phone']) },
    {
      $set:
      {
        location:
          { type: 'Point', coordinates: [parseFloat(req.body['long']), parseFloat(req.body['lat'])] },
        polylineLocs:req.body['updatePolyLines']

      }
    }
  );
  if (ress.acknowledged) {
     res.send("Pilot updated");
      
  }
    else
{
  
    res.send("Pilot Not Updated");
 } 

});
webSockets = {}
var data;
var to;
wsForLiveLocation.on('connection', async (wsx, req) => {

  wsx.id = parseInt(req.url.split('/?phone=')[1]);
  webSockets[wsx.id] = wsx;
  wsx.on('message', async (message) => {
            
     
    console.log(JSON.parse(message));
    data = JSON.parse(message);

    to = parseInt(data['to']);
    if (webSockets[to].readyState !== WebSocket.CLOSED) {
      webSockets[to].send(JSON.stringify(data['location']));
    }
  




  });
});



app.get('/pilots/UserInfo', async (req, res) => {
  let data = await dbConnection();
  let result = await data.find({ phone: parseInt(req.query['phone']) }).toArray();
  console.log(result);
  res.send(result);
});

app.get('/closeTheConnection',async(req,res)=>{
    var phone = parseInt(req.query['phone']);
  delete webSockets[phone];
  res.send(JSON.stringify("deleted"));

});





app.get('/passengers/getUserInfo', async (req, res) => {
  let data = await passengers();
  let result = await data.find({ phone: parseInt(req.query['phone']) }).toArray();
  console.log(result);
  console.log('entered I have');
  res.send(result);
});






app.post('/pilots/pushNewUser', async (req, res) => {

  let data = await dbConnection();
  let ress = await data.insertOne(req.body);
  if (ress.acknowledged) {
    res.send('User Pushed');

  }
  else {
    res.send('maja ni aaya');

  }

});
app.post('/passengers/pushNewUser', async (req, res) => {

  let data = await passengers();
  let ress = await data.insertOne(req.body);
  if (ress.acknowledged) {
    res.send('User Pushed');

  }
  else {
    res.send('maja ni aaya');

  }

});
locationServer.listen(3005, () => console.log("Live Location has been setup!"));
server.listen(3001, () => console.log('Listening on port:3001'));
app.listen(5000);
module.exports = app;
