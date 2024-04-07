const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:7s38mU4x09d2tkl5@PilotPassenger-3452c069.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
const client = new MongoClient(url);

async function passengers() {
  let result = await client.connect();
  let db = result.db('passenger');
  return db.collection('passengers');
}




passengers().then((resp) => {
  resp.find({}).toArray().then((data) => {
    console.warn(data);
  });
})
console.log('Data base is successfully setup');
module.exports = passengers;
