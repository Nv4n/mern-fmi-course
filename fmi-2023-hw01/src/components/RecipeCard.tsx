import { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Recipe } from "../model/Recipe";
import { type User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";

interface RecipeCardProps {
	recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const [author, setAuthor] = useState<User | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			const resp = await UserApiHandler.findUserById(recipe.authorId);
			if (resp.success === true) {
				setAuthor(resp.data);
			}
		};
		void fetchData();
	}, [recipe]);

	return (
		<>
			<Link to={`/recipe/${recipe.id}`} className="card">
				<div className="image-container">
					<Suspense fallback="loading...">
						<img
							src={recipe.cookedImg}
							alt="Finished meal"
							// loading="lazy"
							width={300}
							height={300}
						></img>
					</Suspense>
				</div>
				<div className="info">
					<h2>{recipe.title}</h2>
					<p>Author: {author ? author.username : "<deleted user>"}</p>
					<p>{recipe.shortDescription.slice(150)}</p>
					{recipe.tags.map((tag, index) => {
						return (
							<>
								<span key={`tag-${index}`}>{tag}</span>{" "}
							</>
						);
					})}
				</div>
			</Link>
		</>
	);
};
