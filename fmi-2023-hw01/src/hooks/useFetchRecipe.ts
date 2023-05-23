import { useEffect, useState } from "react";
import { type Recipe } from "../model/Recipe";
import { RecipeApiHandler } from "../service/RecipeApi";

export default function useFetchRecipe(id: string | undefined) {
	const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await RecipeApiHandler.findAll();
				if (resp.success === false) {
					console.log(resp.error);
					return;
				}

				setRecipe(() => resp.data.find((r) => r.id === id));
			}
		};
		void fetchData();
	}, [id]);

	return recipe;
}
