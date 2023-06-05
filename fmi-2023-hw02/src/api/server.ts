import express from "express";
import { recipesRouter } from "./routes/recipesRouter";
import { userRouter } from "./routes/usersRouter";

const app = express();

app.use("/api/users", userRouter);
app.use("/api/recipes", recipesRouter);

app.listen(4000, () =>
	console.log(`

-------------------------------------
Server is listening to port 4000
-------------------------------------
`)
);
