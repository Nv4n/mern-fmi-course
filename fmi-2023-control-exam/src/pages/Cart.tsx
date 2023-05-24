import { Suspense, useEffect, useState } from "react";
import { type Product } from "../model/Product";

export const Cart = () => {
	const [products, setProducts] = useState<Product[] | undefined>(undefined);
	const [sum, setSum] = useState<number>(0);
	const [dds, setDDS] = useState<number>(0);

	useEffect(() => {
		const fetchData = () => {
			const jsonData = localStorage.getItem("cart");
			if (!jsonData) {
				return;
			}
			const data = JSON.parse(jsonData) as Product[];

			setProducts(data);
		};
		if (products) {
			setSum(products.reduce((acc, prod) => acc + prod.price, 0));
			setDDS(Math.round(sum * 0.2 * 100) / 100);
		}

		fetchData();
	}, [products]);

	// const addOrder = async () => {
	// 	OrderApiHandler.createOrder();
	// };

	return (
		<div>
			<div>
				<p>ДДС 20%: {dds}€</p>
				<p>Price: {sum + dds}€</p>
			</div>
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
						</li>
					))}
			</ul>
		</div>
	);
};
