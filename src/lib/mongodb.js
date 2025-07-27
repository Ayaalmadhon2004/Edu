import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MONGODB_URI is read from .env.local and loaded into process.env automatically by Next.js
const options = {}; // to put connection data 

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please provide your MongoDB URI in .env.local');
}

if (process.env.NODE_ENV === "development") { // means in npm run dev
  if (!global._mongoClientPromise) { // global is a global object in Node.js used to store values across the app during runtime
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect(); // so here i save the connection inside global to use it always and not reconnect every time 
  }
  clientPromise = global._mongoClientPromise;
}
  else { // production mode, like when deployed on Vercel
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

