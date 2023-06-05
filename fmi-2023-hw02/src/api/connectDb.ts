import { MongoClient } from "mongodb";

const password = process.env.PASSWORD;
// Connection URL
const url = `mongodb+srv://admin:${
	password ? password : ""
}@homework.hjlnx7w.mongodb.net/`;

const client = new MongoClient(url);
export const run = async () => {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		// await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
};

// export const getDb = async () => {
// 	console.log("TEST");

// 	// Use connect method to connect to the server
// 	try {
// 		console.log(client);

// 		await client.connect();
// 		console.log("Connected successfully to server");
// 		const db = client.db(dbName);
// 		const collection = db.collection("users");
// 		return collection;
// 	} catch (e) {
// 		console.log(e);

// 		throw e;
// 	}

// 	// the following code examples can be pasted here...
// };
