const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:J532R41TN9e7L6qY@live-database-26594717.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=live-database&tls=true';
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
