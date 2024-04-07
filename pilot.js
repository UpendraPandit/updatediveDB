const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:7s38mU4x09d2tkl5@PilotPassenger-3452c069.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
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
