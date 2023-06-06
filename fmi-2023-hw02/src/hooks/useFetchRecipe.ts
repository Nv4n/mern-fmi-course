import { useEffect, useState } from "react";
import { type Recipe } from "../model/Recipe";

export default function useFetchRecipe(id: string | undefined) {
	const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await fetch(`/api/recipes/${id}`);

				if (resp.status < 300) {
					const data = resp.json() as Promise<Recipe>;
					const recipe = await data;
					setRecipe(recipe);
				}
			} else {
				setRecipe(undefined);
			}
		};
		void fetchData();
	}, [id]);

	return recipe;
}
