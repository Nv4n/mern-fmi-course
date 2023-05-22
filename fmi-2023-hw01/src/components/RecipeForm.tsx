import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { RecipeFormSchema } from "../model/RecipeFormTypes";
import { ActiveUserContext } from "../pages/Layout";

type FormRecipe = z.infer<typeof RecipeFormSchema>;

export const RecipeForm = () => {
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
		formState: { errors },
	} = useForm<FormRecipe>({
		resolver: zodResolver(RecipeFormSchema),
		mode: "onTouched",
	});

	const onSubmit = (data: FormRecipe) => {
		console.log(data);
	};

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
					<input {...register(field)} id={id} type={fieldType} />
				)}
				<p>{errors[field]?.message}</p>
				<br></br>
			</>
		);
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
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
