const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:368asK972wzyr04U@db-mongodb-blr1-65307-d09b734f.mongo.ondigitalocean.com/feedback?tls=true&authSource=admin&replicaSet=db-mongodb-blr1-65307';
const client = new MongoClient(url);

async function feedback() {
  let result = await client.connect();
  let db = result.db('feedback');
  return db.collection('CrossFeedback');
}
// dbConnection().then((resp) => {
//   resp.find({'name':'Ayusshi Joshi'}).toArray().then((data) => {
//     console.warn(data);
//   });v
// })
console.log('Data base is successfully setup');

module.exports = feedback;
