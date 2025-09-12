import { MongoClient } from "mongodb";

// Hardcoded MongoDB URI
const uri =
  "mongodb+srv://niltonnovele_db_user:mz5iqsBLaFPvNJtM@cluster0.8no4fd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Mongo URI is missing!");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
