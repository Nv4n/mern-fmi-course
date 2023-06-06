import express, { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { connectDb } from "./connectDb";
import { recipesRouter } from "./routes/recipesRouter";
import { userRouter } from "./routes/usersRouter";

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
	// Set permissive CORS header - this allows this server to be used only as
	// an API server in conjunction with something like webpack-dev-server.
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader("Access-Control-Max-Age", 3600); // 1 hour
	// Disable caching so we'll always get the latest posts.
	res.setHeader("Cache-Control", "no-cache");
	next();
});
app.use("/api/users", userRouter);
app.use("/api/recipes", recipesRouter);

app.get(
	"/api/seed",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			// console.log(db);
			// db.collection('users').insertMany()

			const users = await db.collection("users").find().toArray();

			res.json(users);
		} catch (error) {
			console.error("Error retrieving users:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})
);
app.listen(4000, () =>
	console.log(`

-------------------------------------
Server is listening to port 4000
-------------------------------------
`)
);
