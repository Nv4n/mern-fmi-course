import { Suspense } from "react";
import { useParams } from "react-router-dom";
import useFetchAuthor from "../hooks/useFetchAuthor";
import useFetchRecipe from "../hooks/useFetchRecipe";

export const RecipeDetails = () => {
	const { id } = useParams();
	const recipe = useFetchRecipe(id);
	const author = useFetchAuthor(recipe && recipe.authorId);

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<div>
				{!recipe ? (
					<h2>Loading...</h2>
				) : (
					<>
						<h1>{`${recipe.title}: ${recipe.cookingTime} mins`}</h1>
						<div>
							<Suspense fallback={<p>Loading...</p>}>
								<img
									src={recipe.cookedImg}
									alt="Finished meal"
									loading="lazy"
									width={300}
									height={300}
								></img>
							</Suspense>
							<p>Author: {author ? author : "<deleted user>"}</p>
							<p>{recipe.description}</p>
							<div>
								<span>Products: </span>
								{recipe.products.map((product) => {
									return (
										<>
											<span>{product}</span>
											{", "}
										</>
									);
								})}
							</div>

							<br></br>
							{recipe.tags.map((tag) => {
								return (
									<>
										<span className="tag" key={tag}>
											{tag}
										</span>{" "}
									</>
								);
							})}
						</div>
					</>
				)}
			</div>
		</Suspense>
	);
};
