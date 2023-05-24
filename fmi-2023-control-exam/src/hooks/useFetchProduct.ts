import { useEffect, useState } from "react";
import { type Product } from "../model/Product";
import { ProductApiHandler } from "../service/ProductApi";

export default function useFetchProduct(id: string | undefined) {
	const [product, setProduct] = useState<Product | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const valueId = parseInt(id);
				const resp = await ProductApiHandler.findAll();
				if (resp.success === false) {
					console.log(resp.error);
					return;
				}

				setProduct(() => resp.data.find((p) => p.id === valueId));
			} else {
				setProduct(undefined);
			}
		};
		void fetchData();
	}, [id]);

	return product;
}
