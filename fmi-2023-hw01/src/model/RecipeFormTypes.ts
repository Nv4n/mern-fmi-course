import { RecipeSchema } from "./Recipe";

const nonemptyMsg = "Must be at least 1 symbol";

export const RecipeFormSchema = RecipeSchema.omit({
	id: true,
	authorId: true,
	publishedAt: true,
	lastUpdated: true,
}) // Adding nonempty checks
	.refine(
		(data) => {
			const { title } = data;
			return !!title;
		},
		{
			message: nonemptyMsg,
			path: ["title"],
		}
	)
	.refine(
		(data) => {
			const { shortDescription } = data;
			return !!shortDescription;
		},
		{
			message: nonemptyMsg,
			path: ["shortDescription"],
		}
	)
	.refine(
		(data) => {
			const { cookingTime } = data;
			return !!cookingTime;
		},
		{
			message: nonemptyMsg,
			path: ["cookingTime"],
		}
	)
	.refine(
		(data) => {
			const { products } = data;
			return !!products;
		},
		{
			message: nonemptyMsg,
			path: ["products"],
		}
	)
	.refine(
		(data) => {
			const { description } = data;
			return !!description;
		},
		{
			message: nonemptyMsg,
			path: ["description"],
		}
	)
	.refine(
		(data) => {
			const { tags } = data;
			return !!tags;
		},
		{
			message: nonemptyMsg,
			path: ["tags"],
		}
	);
