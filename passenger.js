const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:368asK972wzyr04U@db-mongodb-blr1-65307-d09b734f.mongo.ondigitalocean.com/passenger?tls=true&authSource=admin&replicaSet=db-mongodb-blr1-65307';
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
