import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "cooking";

const client = new MongoClient(url);

export const connectDb = async () => {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		const db = client.db(dbName);
		return db;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
};

export const closeDb = async () => {
	await client.close();
};
