const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://doadmin:0m9P2L357q4r8sOR@livedb-aac25584.mongo.ondigitalocean.com/Feedback?tls=true&authSource=admin';
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
