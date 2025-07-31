import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

async function test() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db("Education");
    const teachers = await db.collection("Teachers").find({}).toArray();
    console.log("Teachers:", teachers);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

test();
