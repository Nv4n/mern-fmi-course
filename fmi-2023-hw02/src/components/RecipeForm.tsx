import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type z } from "zod";
import useFetchRecipe from "../hooks/useFetchRecipe";
import { type Recipe } from "../model/Recipe";
import { RecipeFormSchema } from "../model/RecipeFormTypes";
import { ActiveUserContext } from "../pages/Layout";

export type FormRecipe = z.infer<typeof RecipeFormSchema>;

function isKeyOfRecipe(key: string, recipe: Recipe): key is keyof FormRecipe {
	return key in recipe;
}

export const RecipeForm = () => {
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);
	const { id } = useParams();
	const recipe: Recipe | undefined = useFetchRecipe(id);
	const { pathname } = useLocation();
	const formType = pathname.startsWith("/recipe/create/")
		? "create"
		: pathname.startsWith("/recipe/edit/")
		? "edit"
		: "invalid";

	const navigate = useNavigate();
	const activeUser = useContext(ActiveUserContext);
	useEffect(() => {
		if (!activeUser) {
			navigate("/");
		}
	}, [activeUser]);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormRecipe>({
		resolver: zodResolver(RecipeFormSchema),
		mode: "onTouched",
	});

	useEffect(() => {
		if (!recipe) {
			reset();
			return;
		}
		const defaultValues = {
			title: recipe.title,
			shortDescription: recipe.shortDescription,
			cookingTime: recipe.cookingTime.toString(),
			products: recipe.products.join(", "),
			cookedImg: recipe.cookedImg,
			description: recipe.description,
			tags: recipe.tags.join(", "),
		};

		for (const key in defaultValues) {
			if (isKeyOfRecipe(key, recipe)) {
				setValue(key, defaultValues[key]);
			}
		}
	}, [recipe]);

	const generateInput = (
		label: string,
		field: keyof FormRecipe,
		fieldType?: "text" | "number",
		inputType?: "textArea"
	) => {
		const id = useId();
		return (
			<>
				<label htmlFor={id}>{label}: </label>
				{inputType ? (
					<textarea {...register(field)} id={id} />
				) : (
					<input
						{...register(field)}
						id={id}
						min={1}
						type={fieldType}
					/>
				)}
				<p>{errors[field]?.message}</p>
				<br></br>
			</>
		);
	};

	const onSubmit = async (data: FormRecipe) => {
		if (!activeUser) {
			setRespErrorMsg("No active user");
			return;
		}
		if (formType === "create") {
			const resp = await fetch("/api/recipes/create", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ recipe: data, authorId: activeUser.id }),
			});

			if (resp.status >= 300) {
				const respData = resp.json() as Promise<{ message: string }>;
				const err = (await respData).message;
				setRespErrorMsg(err);
				return;
			}
			navigate("/");
		}
		if (formType === "edit") {
			if (!recipe) {
				setRespErrorMsg("No such recipe");
				return;
			}
			const entity: Recipe = {
				id: recipe.id,
				authorId: recipe.authorId,
				publishedAt: new Date(recipe.publishedAt),
				lastUpdated: new Date(),
				...data,
			};

			const resp = await fetch(`/api/recipes/${entity.id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ recipe: entity }),
			});

			if (resp.status >= 300) {
				const respData = resp.json() as Promise<{ message: string }>;
				const err = (await respData).message;
				setRespErrorMsg(err);
				return;
			}
			navigate("/");
		}
	};

	return (
		<>
			{/* eslint-disable @typescript-eslint/no-misused-promises */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>RECIPES ARE ADDED HERE</h1>
				{generateInput("Title", "title")}
				{generateInput("Short description", "shortDescription")}
				{generateInput("Cooking time", "cookingTime", "number")}
				{generateInput("Products", "products")}
				{generateInput("Result image", "cookedImg")}
				{generateInput(
					"Description",
					"description",
					undefined,
					"textArea"
				)}
				{generateInput("Tags", "tags")}
				<p>{respErrorMsg}</p>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
