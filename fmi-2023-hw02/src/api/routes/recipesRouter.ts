import { Router, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { type Recipe, RecipeSchema } from "../../model/Recipe";
import { RecipeFormSchema } from "../../model/RecipeFormTypes";
import { closeDb, connectDb } from "../connectDb";
import { ObjectId } from "mongodb";

const collName = "recipes";
const BodySchema = z.string();

export const CreateRecipeSchema = z.object({
	recipe: RecipeFormSchema,
	authorId: RecipeSchema.shape.authorId,
});

export const UpdateRecipeSchema = z.object({
	recipe: RecipeSchema,
});

export const recipesRouter = Router();
recipesRouter.get(
	"/",
	asyncHandler(async (_req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const recipes = await db
				.collection<Recipe>(collName)
				.find()
				.toArray();

			const parsedRecipes = z.array(RecipeSchema).safeParse(recipes);
			if (parsedRecipes.success === false) {
				console.error("Error retrieving recipes:", parsedRecipes.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			res.status(200).json({ recipes: parsedRecipes.data });
		} catch (error) {
			console.error("Error retrieving recipes:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

recipesRouter.post(
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
			const parsedBody = CreateRecipeSchema.safeParse(
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

			const parsedFormRecipe = parsedBody.data.recipe;
			const parsedAuthorId = parsedBody.data.authorId;
			const parsedRecipe = RecipeSchema.safeParse({
				id: undefined,
				authorId: parsedAuthorId,
				...parsedFormRecipe,
				publishedAt: undefined,
				lastUpdated: undefined,
			});
			if (parsedRecipe.success === false) {
				console.error("Error parsing recipe:", parsedRecipe.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const collection = db.collection<Recipe>(collName);
			const result = await collection.insertOne(parsedRecipe.data);
			console.log(
				`Recipe with id: ${result.insertedId.toString()} created`
			);

			res.status(201).send("success");
		} catch (error) {
			console.error("Error retrieving recipes:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

recipesRouter.delete(
	"/:recipeId",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const id = new ObjectId(req.params.recipeId);
			const parsedId = DeleteRecipeSchema.safeParse(id);
			if (parsedId.success === false) {
				console.error("Error parsing recipeId:", parsedId.error);
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const collection = db.collection(collName);
			const result = await collection.deleteOne(parsedId.data);
			console.log(`${result.deletedCount} recipes deleted`);

			res.status(200).send("success");
		} catch (error) {
			console.error("Error retrieving recipes:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);

recipesRouter.put(
	"/:recipeId",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			const db = await connectDb();
			const recipeId = new ObjectId(req.params.recipeId);
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

			const parsedUpdatedRecipe = parsedBody.data.recipe;
			if (parsedUpdatedRecipe.id !== recipeId) {
				console.error("Error matching recipe ids");
				res.status(500).json({ message: "Internal server error" });
				return;
			}
			const collection = db.collection<Recipe>(collName);
			const result = await collection.replaceOne(
				{ id: recipeId },
				parsedUpdatedRecipe
			);

			res.status(200).send("success");
		} catch (error) {
			console.error("Error retrieving recipes:", error);
			res.status(500).json({ message: "Internal server error" });
		} finally {
			await closeDb();
		}
	})
);
