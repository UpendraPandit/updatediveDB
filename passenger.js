const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:T2673ly9L4VD15BY@db-mongodb-nyc1-89412-a673e063.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
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
