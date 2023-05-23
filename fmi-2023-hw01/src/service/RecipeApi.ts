import { type FormRecipe } from "../components/RecipeForm";
import { RecipeSchema, type Recipe } from "../model/Recipe";
import {
	BASE_API_URL,
	generateUUID,
	handleRequest,
	type ApiResponse,
} from "./ApiClients";

interface RecipeApi {
	findAll: () => Promise<ApiResponse<Recipe[]>>;
	createRecipe: (
		data: FormRecipe,
		authorId: string
	) => Promise<ApiResponse<Recipe>>;
	deleteRecipe: (id: string) => Promise<ApiResponse<boolean>>;
}

export const RecipeApiHandler: RecipeApi = {
	findAll: async function (): Promise<ApiResponse<Recipe[]>> {
		try {
			const recipes = await handleRequest<Recipe[]>(
				`${BASE_API_URL}/recipes`
			);
			if (recipes) {
				return { success: true, data: recipes };
			}
			return { success: false, error: "No recipes found" };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},

	createRecipe: async function (
		data: FormRecipe,
		authorId: string
	): Promise<ApiResponse<Recipe>> {
		const result = RecipeSchema.safeParse({
			id: generateUUID(24),
			authorId: authorId,
			...data,
			publishedAt: undefined,
			lastUpdated: undefined,
		});
		if (result.success === false) {
			return { success: false, error: result.error.message };
		}

		const entity = result.data satisfies Recipe;

		try {
			await handleRequest<Recipe>(`${BASE_API_URL}/recipes`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(entity),
			});
			return { success: true, data: entity };
		} catch (err) {
			return { success: false, error: "Request failed" };
		}
	},
	deleteRecipe: async function (id: string): Promise<ApiResponse<boolean>> {
		try {
			await handleRequest<Recipe>(`${BASE_API_URL}/recipes/${id}`, {
				method: "DELETE",
				headers: {
					"content-type": "application/json",
				},
			});
			return { success: true, data: true };
		} catch (err) {
			return { success: false, error: "Request failed" };
		}
	},
};
