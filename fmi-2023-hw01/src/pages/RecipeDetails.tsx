import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type Recipe } from "../model/Recipe";
import { type User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";

export const RecipeDetails = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [author, setAuthor] = useState<User | null>(null);
	useEffect(() => {
		const fetchRecipe = async () => {
			if (!id) {
				return;
			}

			const resp = await UserApiHandler.findUserById(id);
			if (resp.success === true) {
				setAuthor(resp.data);
			}
		};

		void fetchRecipe();
	}, [id]);

	useEffect(() => {
		const fetchRecipe = async () => {
			if (!id) {
				return;
			}

			const resp = await UserApiHandler.findUserById(id);
			if (resp.success === true) {
				setAuthor(resp.data);
			}
		};

		void fetchRecipe();
	}, [id]);

	return (
		<div>
			<h1>{`${recipe.title}: ${recipe.cookingTime} mins`}</h1>
			<div>
				<Suspense fallback={<p>Loading...</p>}>
					<img
						src={recipe.cookedImg}
						alt="Finished meal"
						loading="lazy"
						width={500}
						height={500}
					></img>
				</Suspense>
				<p>Author: {author ? author : "<deleted user>"}</p>
				<p>{recipe.description}</p>
				{recipe.tags.map((tag) => {
					return (
						<>
							<span>{tag}</span>{" "}
						</>
					);
				})}
			</div>
		</div>
	);
};
