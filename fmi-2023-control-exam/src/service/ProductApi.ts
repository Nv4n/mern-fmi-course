import { type FormProduct } from "../components/ProductForm";
import { ProductSchema, type Product } from "../model/Product";
import { handleRequest, type ApiResponse, BASE_API_URL } from "./ApiClient";

interface ProductApi {
	findAll: () => Promise<ApiResponse<Product[]>>;
	createProduct: (data: FormProduct) => Promise<ApiResponse<Product>>;
	updateProduct: (data: Product) => Promise<ApiResponse<Product>>;
	deleteProduct: (id: number) => Promise<ApiResponse<boolean>>;
}

export const ProductApiHandler: ProductApi = {
	findAll: async function (): Promise<ApiResponse<Product[]>> {
		try {
			const products = await handleRequest<Product[]>(
				`${BASE_API_URL}/products`
			);
			if (products) {
				return { success: true, data: products };
			}
			return { success: false, error: "No products found" };
		} catch (err) {
			return { success: false, error: "Failed fetchAll request" };
		}
	},
	createProduct: async function (
		data: FormProduct
	): Promise<ApiResponse<Product>> {
		let id = -1;
		try {
			const resp = await this.findAll();
			if (resp.success === false && resp.error === "No products found") {
				id = 1;
			} else if (resp.success === false) {
				return { success: false, error: resp.error };
			} else {
				id = resp.data[resp.data.length - 1].id + 1;
			}
		} catch (err) {
			return { success: false, error: "Failed fetchAll request" };
		}

		const zodResp = ProductSchema.safeParse({
			id: id,
			...data,
		});
		if (zodResp.success === false) {
			return { success: false, error: zodResp.error.message };
		}
		const entity = zodResp.data satisfies Product;

		try {
			await handleRequest<Product>(`${BASE_API_URL}/products`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(entity),
			});

			return { success: true, data: entity };
		} catch (err) {
			return { success: false, error: "Failed create request" };
		}
	},
	updateProduct: async function (
		data: Product
	): Promise<ApiResponse<Product>> {
		const zodResp = ProductSchema.safeParse({
			...data,
		});
		if (zodResp.success === false) {
			return { success: false, error: zodResp.error.message };
		}
		const entity = zodResp.data;

		try {
			await handleRequest<Product>(
				`${BASE_API_URL}/products/${entity.id}`,
				{
					method: "PUT",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(entity),
				}
			);

			return { success: true, data: entity };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
	deleteProduct: async function (id: number): Promise<ApiResponse<boolean>> {
		try {
			await handleRequest<Product>(`${BASE_API_URL}/products/${id}`, {
				method: "DELETE",
			});

			return { success: true, data: true };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
};
