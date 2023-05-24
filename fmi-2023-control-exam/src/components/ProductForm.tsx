import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { type z } from "zod";
import useFetchProduct from "../hooks/useFetchProduct";
import { ProductFormSchema, type Product } from "../model/Product";
import { ProductApiHandler } from "../service/ProductApi";

export type FormProduct = z.infer<typeof ProductFormSchema>;

function isKeyOfProduct(
	key: string,
	product: Product
): key is keyof FormProduct {
	return key in product;
}

export const ProductForm = () => {
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);
	const { id } = useParams();
	const product: Product | undefined = useFetchProduct(id);
	const { pathname } = useLocation();
	const formType = pathname.startsWith("/product/add")
		? "create"
		: pathname.startsWith("/product/edit/")
		? "edit"
		: "invalid";

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormProduct>({
		resolver: zodResolver(ProductFormSchema),
		mode: "onTouched",
	});

	useEffect(() => {
		if (!product) {
			reset();
			return;
		}
		const defaultValues = {
			info: product.info,
			price: product.price,
			category: product.category,
			img: product.img,
			tags: product.tags,
		};

		for (const key in defaultValues) {
			if (isKeyOfProduct(key, product)) {
				setValue(key, defaultValues[key]);
			}
		}
	}, [product]);

	const generateInput = (
		label: string,
		field: keyof FormProduct,
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

	const onSubmit = async (data: FormProduct) => {
		if (formType === "create") {
			const resp = await ProductApiHandler.createProduct(data);
			if (resp.success === false) {
				setRespErrorMsg(resp.error);
				return;
			}
			navigate("/dashboard");
		}
		if (formType === "edit") {
			if (!product) {
				setRespErrorMsg("No such product");
				return;
			}
			const entity: Product = {
				id: product.id,
				...data,
			};

			const resp = await ProductApiHandler.updateProduct(entity);

			if (resp.success === false) {
				setRespErrorMsg(resp.error);
				return;
			}
			console.log(resp.data);
			navigate("/dashboard");
		}
	};

	return (
		<>
			{/* eslint-disable @typescript-eslint/no-misused-promises */}
			<form onSubmit={handleSubmit(onSubmit)}>
				{generateInput("Category", "category")}
				{generateInput("Info", "info", undefined, "textArea")}
				{generateInput("price", "price", "number")}
				{generateInput("Image", "img")}
				{generateInput("Tags", "tags")}
				<p>{respErrorMsg}</p>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
