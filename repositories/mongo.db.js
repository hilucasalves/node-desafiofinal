import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;

function getClient() {
  const uri = '';
  return new mongodb.MongoClient(uri);
}

export { getClient, ObjectID };
