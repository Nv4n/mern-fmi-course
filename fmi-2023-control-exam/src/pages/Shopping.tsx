import { useState, useEffect, Suspense } from "react";
import { type Product } from "../model/Product";
import { ProductApiHandler } from "../service/ProductApi";

export const Shopping = () => {
	const [products, setProducts] = useState<Product[] | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			const resp = await ProductApiHandler.findAll();
			if (resp.success === false) {
				console.log(resp.error);
				return;
			}
			const data = resp.data;
			data.sort((a, b) => a.price - b.price);

			setProducts(data);
		};

		void fetchData();
	}, []);

	const onAdd = (product: Product) => {
		const cart = localStorage.getItem("cart");
		let data: Product[];
		if (cart) {
			data = [...(JSON.parse(cart) as Product[])];
			data.push(product);
			localStorage.setItem("cart", JSON.stringify(data));
		}else{
			localStorage.setItem("cart", JSON.stringify([product]));
		}
	};

	return (
		<div>
			<h1>JUST SHOPPING HERE</h1>
			<Suspense fallback="LOADING...">
				<ul>
					{products &&
						products.map((p) => (
							<li key={p.id}>
								<h2>{p.category}</h2>
								<Suspense fallback={<p>Loading...</p>}>
									<img
										src={p.img}
										alt="Product img"
										className="img-container"
									></img>
								</Suspense>
								<p>{p.info}</p>
								<span>Price: {p.price} €</span>
								<h3>TAGS:</h3>
								{p.tags.map((tag) => (
									<>
										<span>{tag}</span>{" "}
									</>
								))}
								<button onClick={() => onAdd(p)}>
									ADD TO CART
								</button>
							</li>
						))}
				</ul>
			</Suspense>
		</div>
	);
};
