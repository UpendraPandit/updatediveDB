const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:T2673ly9L4VD15BY@db-mongodb-nyc1-89412-a673e063.mongo.ondigitalocean.com/admin?tls=true&authSource=admin';
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
