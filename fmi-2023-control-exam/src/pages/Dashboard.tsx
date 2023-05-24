import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type Product } from "../model/Product";
import { ProductApiHandler } from "../service/ProductApi";

export const Dashboard = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [respErrorMsg, setRespErrorMsg] = useState<string>("");
	const navigate = useNavigate();
	useEffect(() => {
		const fetchData = async () => {
			const resp = await ProductApiHandler.findAll();
			if (resp.success === true) {
				setProducts(resp.data);
				return;
			}

			setRespErrorMsg(resp.error);
		};

		void fetchData();
	}, []);

	const onDelete = async (id: number) => {
		const resp = await ProductApiHandler.deleteProduct(id);
		if (resp.success === false) {
			setRespErrorMsg(resp.error);
		}
		navigate(0);
	};
	return (
		<div>
			<div>
				<Link to={"/product/add"}>Add product</Link>
				<p>{respErrorMsg}</p>
			</div>
			<Suspense fallback={<p>Loading...</p>}>
				<ul>
					{products.map((p) => (
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
							<Link to={`/product/edit/${p.id}`}>EDIT</Link>
							<button onClick={() => void onDelete(p.id)}>
								DELETE
							</button>
						</li>
					))}
				</ul>
			</Suspense>
		</div>
	);
};
