import { OrderSchema, type Order } from "../model/Order";
import { BASE_API_URL, handleRequest, type ApiResponse } from "./ApiClient";

interface OrderApi {
	findAll: () => Promise<ApiResponse<Order[]>>;
	createOrder: (data: Order) => Promise<ApiResponse<Order>>;
}

export const OrderApiHandler: OrderApi = {
	findAll: async function (): Promise<ApiResponse<Order[]>> {
		try {
			const products = await handleRequest<Order[]>(
				`${BASE_API_URL}/orders`
			);
			if (products) {
				return { success: true, data: products };
			}
			return { success: false, error: "No orders found" };
		} catch (err) {
			return { success: false, error: "Failed fetchAll request" };
		}
	},
	createOrder: async function (data: Order): Promise<ApiResponse<Order>> {
		let id = -1;
		try {
			const resp = await this.findAll();
			if (resp.success === false && resp.error === "No orders found") {
				id = 1;
			} else if (resp.success === false) {
				return { success: false, error: resp.error };
			} else {
				id = resp.data[resp.data.length - 1].id + 1;
			}
		} catch (err) {
			return { success: false, error: "Failed fetchAll request" };
		}

		const zodResp = OrderSchema.safeParse({
			...data,
		});
		if (zodResp.success === false) {
			return { success: false, error: zodResp.error.message };
		}
		const entity = zodResp.data satisfies Order;

		try {
			await handleRequest<Order>(`${BASE_API_URL}/orders`, {
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
};
