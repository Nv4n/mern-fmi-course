import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { RecipeFormSchema } from "../model/RecipeFormTypes";
import { ActiveUserContext } from "../pages/Layout";
import { RecipeApiHandler } from "../service/RecipeApi";

export type FormRecipe = z.infer<typeof RecipeFormSchema>;

export const RecipeForm = () => {
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);
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
		const resp = await RecipeApiHandler.createRecipe(data, activeUser.id);
		if (resp.success === false) {
			setRespErrorMsg(resp.error);
			return;
		}

		navigate("/");
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
