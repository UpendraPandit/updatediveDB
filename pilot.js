const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:0m9P2L357q4r8sOR@livedb-aac25584.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
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
