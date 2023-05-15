const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:0m9P2L357q4r8sOR@livedb-aac25584.mongo.ondigitalocean.com/passenger?tls=true&authSource=admin';
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
