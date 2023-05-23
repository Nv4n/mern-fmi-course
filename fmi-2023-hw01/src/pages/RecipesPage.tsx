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
				const data = [...resp.data];
				data.sort((a, b) => {
					if (a.publishedAt < b.publishedAt) {
						return 1;
					} else if (a.publishedAt > b.publishedAt) {
						return -1;
					} else {
						return 0;
					}
				});

				setRecipes(data.slice(0, 10));
			}
		};
		void fetchData();
	}, []);

	return (
		<div>
			{recipes.map((recipe) => {
				return (
					<>
						<Suspense fallback={<p>Loading...</p>}>
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
							></RecipeCard>
						</Suspense>
					</>
				);
			})}
		</div>
	);
};
