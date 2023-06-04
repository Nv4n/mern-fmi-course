import * as express from "express";
import { Request, Response } from "express";
require("dotenv").config();

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening to ${PORT}`);
});
