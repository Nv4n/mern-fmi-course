import { Suspense, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type Recipe } from "../model/Recipe";
import useFetchAuthor from "../hooks/useFetchAuthor";
import { ActiveUserContext } from "../pages/Layout";
import { RecipeApiHandler } from "../service/RecipeApi";
interface RecipeCardProps {
	recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const author = useFetchAuthor(recipe.authorId);
	const activeUser = useContext(ActiveUserContext);
	const navigate = useNavigate();

	const onDelete = async () => {
		const resp = await RecipeApiHandler.deleteRecipe(recipe.id);
		if (resp.success === false) {
			console.log(resp.error);
		}
		navigate(0);
	};
	return (
		<div className="card">
			<Link to={`/recipe/${recipe.id}`} className="card-container">
				<div className="image-container">
					<Suspense fallback="loading...">
						<img
							src={recipe.cookedImg}
							alt="Finished meal"
							width={300}
							height={300}
						></img>
					</Suspense>
				</div>
				<div className="info">
					<h2>{recipe.title}</h2>
					<p>Author: {author ? author : "<deleted user>"}</p>
					<p>
						{recipe.shortDescription.slice(0, 150)}
						{recipe.shortDescription.length > 150 ? "..." : ""}
					</p>
					{recipe.tags.map((tag, index) => {
						return (
							<>
								<span className="tag" key={`tag-${index}`}>
									{tag}
								</span>{" "}
							</>
						);
					})}
				</div>
			</Link>
			{activeUser &&
			(activeUser.id === recipe.authorId ||
				activeUser.role === "admin") ? (
				<>
					<Link to={`/recipe/edit/${recipe.id}`} className="nav-link">
						EDIT
					</Link>

					<button
						className="nav-link"
						onClick={() => {
							void onDelete();
						}}
					>
						DELETE
					</button>
				</>
			) : null}
		</div>
	);
};
