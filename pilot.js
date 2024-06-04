const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:J532R41TN9e7L6qY@live-database-26594717.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=live-database&tls=true';
const client = new MongoClient(url);

async function dbConnection() {
  let result = await client.connect();
  let db = result.db('admin');
  return db.collection('pilots');
}
// dbConnection().then((resp) => {
//   resp.find({'name':'Ayusshi Joshi'}).toArray().then((data) => {
//     console.warn(data);
//   });
// })
console.log('Data base is successfully setup');

module.exports = dbConnection;
