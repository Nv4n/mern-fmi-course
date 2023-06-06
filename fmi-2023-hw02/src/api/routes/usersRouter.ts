import { Router, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
import z from "zod";
import { UserObjSchema, UserSchema, type User } from "../../model/User";
import maleSVG from "../../static/male.svg";
import { closeDb, connectDb } from "../connectDb";

const collName = "users";
const BodySchema = z.string();

export const CreateUserSchema = z.object({
	username: UserObjSchema.shape.username,
	password: UserObjSchema.shape.password,
});

export const UpdateRecipeSchema = z.object({
	user: UserSchema,
});

export const userRouter = Router();

userRouter.get(
	"/",
	asyncHandler(async (_req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const users = await db.collection<User>(collName).find().toArray();

			const parsedUsers = z.array(UserSchema).safeParse(users);
			if (parsedUsers.success === false) {
				console.error("Error retrieving users:", parsedUsers.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			res.status(200).json({ users: parsedUsers.data });
		} catch (error) {
			console.error("Error retrieving users:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);
userRouter.get(
	"/username/:username",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const username = req.params.id;
			const user = await db
				.collection<User>(collName)
				.findOne({ username: username });
			if (user) {
				res.status(200).json({ user: user });
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			console.error("Error retrieving user:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);
userRouter.get(
	"/:userId",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const userId = new ObjectId(req.params.userId).toString();
			const user = await db
				.collection<User>(collName)
				.findOne({ id: userId });
			if (user) {
				res.status(200).json({ user: user });
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error) {
			console.error("Error retrieving user:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

userRouter.post(
	"/create",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const body = BodySchema.safeParse(req.body);
			if (body.success === false) {
				console.error("Body is not a string", body.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const parsedBody = CreateUserSchema.safeParse(
				JSON.parse(body.data)
			);

			if (parsedBody.success === false) {
				console.error(
					"Error retrieving recipe body:",
					parsedBody.error
				);
				res.status(500).json({ message: "Internal server error" });
				return;
			}

			const parsedFormUser = parsedBody.data;
			const parsedUser = UserSchema.safeParse({
				id: undefined,
				name: "Default Name",
				username: parsedFormUser.username,
				password: parsedFormUser.password,
				gender: "male",
				role: "user",
				avatar: maleSVG,
				description: "no description",
				validationStatus: "active",
				registeredAt: undefined,
				lastUpdatedAt: undefined,
			});
			if (parsedUser.success === false) {
				console.error("Error parsing user:", parsedUser.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const collection = db.collection<User>(collName);
			const result = await collection.insertOne(parsedUser.data);
			console.log(
				`User with id: ${result.insertedId.toString()} created`
			);

			res.status(201).send("success");
		} catch (error) {
			console.error("Error retrieving users:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

userRouter.delete(
	"/:userId",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const userId = new ObjectId(req.params.id).toString();

			const collection = db.collection(collName);
			const result = await collection.deleteOne({ id: userId });
			console.log(`${result.deletedCount} users deleted`);

			res.status(200).send("success");
		} catch (error) {
			console.error("Error deleting user:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

userRouter.put(
	"/:userId",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const userId = new ObjectId(req.params.userId).toString();
			const body = BodySchema.safeParse(req.body);
			if (body.success === false) {
				console.error("Body is not a string", body.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const parsedBody = UpdateRecipeSchema.safeParse(
				JSON.parse(body.data)
			);

			if (parsedBody.success === false) {
				console.error(
					"Error retrieving recipe body:",
					parsedBody.error
				);
				res.status(500).json({ message: "Internal server error" });
				return;
			}

			const parsedUpdatedUser = parsedBody.data.user;

			const collection = db.collection<User>(collName);
			await collection.replaceOne({ id: userId }, parsedUpdatedUser);

			res.status(200).send("success");
		} catch (error) {
			console.error("Error retrieving users:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);
