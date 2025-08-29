import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("testDB");
    const collection = db.collection("testCollection");
    const data = await collection.find({}).toArray();
    res.status(200).json({ message: "MongoDB connected", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}

export default handler;
