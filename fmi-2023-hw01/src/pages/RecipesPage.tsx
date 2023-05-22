import { Suspense, useEffect, useState } from "react";
import { type Recipe } from "../model/Recipe";
import { RecipeApiHandler } from "../service/RecipeApi";
import { RecipeCard } from "../components/RecipeCard";

export const RecipePage = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const resp = await RecipeApiHandler.findAll();
			if (resp.success === false) {
				console.log(resp.error);
			} else {
				setRecipes(resp.data);
			}
		};
		void fetchData();
	}, []);
	console.log(recipes);

	return (
		<div>
			{recipes.map((recipe) => {
				return (
					<>
						<Suspense key={recipe.id} fallback={<p>Loading...</p>}>
							<RecipeCard recipe={recipe}></RecipeCard>
						</Suspense>
					</>
				);
			})}
		</div>
	);
};
