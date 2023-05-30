import { Suspense, useEffect, useMemo, useState } from "react";
import { RecipeCard } from "../components/RecipeCard";
import usetFetchAllAuthors from "../hooks/userFetchAllAuthors";
import { type Recipe } from "../model/Recipe";
import { RecipeApiHandler } from "../service/RecipeApi";
import { Filter } from "../components/Filter";
import { useSearchParams } from "react-router-dom";

export const RecipePage = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const authors = usetFetchAllAuthors(recipes);
	const [filterParams, _] = useSearchParams();

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

				const tags = new Set<string>();
				data.forEach((recipe) => {
					recipe.tags.forEach((tag) => {
						tags.add(tag);
					});
				});

				setRecipes(data);
				setTags(Array.from(tags));
			}
		};
		void fetchData();
	}, []);

	const filteredRecipes = useMemo(() => {
		const author = filterParams.get("author");
		const tag = filterParams.get("tag");
		if (
			recipes &&
			((author && author != "no-author") || (tag && tag != "no-tag"))
		) {
			return recipes.filter((recipe) => {
				if (author && author != "no-author" && tag && tag != "no-tag") {
					return (
						recipe.authorId == author && recipe.tags.includes(tag)
					);
				}
				if (author && author != "no-author") {
					return recipe.authorId == author;
				}
				if (tag && tag != "no-tag") {
					return recipe.tags.includes(tag);
				}
			});
		}

		if (recipes) {
			return recipes.slice(0, 10);
		}
	}, [recipes, filterParams]);
	return (
		<div>
			<div>
				<Filter authors={authors} tags={tags}></Filter>
			</div>
			{filteredRecipes &&
				filteredRecipes.map((recipe) => {
					return (
						<>
							<Suspense fallback={<p>Loading...</p>}>
								<RecipeCard
									key={`card-${recipe.id}`}
									recipe={recipe}
								></RecipeCard>
							</Suspense>
						</>
					);
				})}
		</div>
	);
};
