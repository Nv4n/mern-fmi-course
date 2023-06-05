import { Router } from "express";

export const userRouter = Router();
userRouter.get("/", (req, res) => res.send("Router"));
// userRouter.get("/test", (_req: Request, res: Response) => {
// 	const asyncFoo = async () => {
// 		try {
// 			console.log("TEST");

// 			// Perform asynchronous operations here
// 			await run();
// 			// void res.json(data);
// 		} catch (error) {
// 			console.error("Error:", error);
// 			res.status(500).json({ error: "Internal Server Error" });
// 		}
// 	};
// 	void asyncFoo();
// });
