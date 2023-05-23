import { type User, UserSchema } from "../model/User";
import maleSVG from "../static/male.svg";
import {
	type ApiResponse,
	BASE_API_URL,
	generateUUID,
	handleRequest,
} from "./ApiClients";

interface UserApi {
	findAll: () => Promise<ApiResponse<User[]>>;
	findUserById: (id: string) => Promise<ApiResponse<User>>;
	findUser: (username: string) => Promise<ApiResponse<User>>;
	createUser: (
		username: string,
		password: string
	) => Promise<ApiResponse<User>>;
	deleteUser: (id: string) => Promise<ApiResponse<boolean>>;
}

export const UserApiHandler: UserApi = {
	findAll: async function (): Promise<ApiResponse<User[]>> {
		try {
			const users = await handleRequest<User[]>(`${BASE_API_URL}/users`);
			if (users) {
				return { success: true, data: users };
			}
			return { success: false, error: "No users found" };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
	findUser: async function (username: string): Promise<ApiResponse<User>> {
		try {
			const users = await handleRequest<User[]>(`${BASE_API_URL}/users`);

			if (!users) {
				return { success: false, error: "No users found" };
			}
			const user = users.find((u) => u.username === username);

			if (!user) {
				return {
					success: false,
					error: "Username or password are wrong",
				};
			}

			return { success: true, data: user };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
	findUserById: async function (id: string): Promise<ApiResponse<User>> {
		try {
			const users = await handleRequest<User[]>(`${BASE_API_URL}/users`);

			if (!users) {
				return { success: false, error: "No users found" };
			}
			const user = users.find((u) => u.id === id);

			if (!user) {
				return {
					success: false,
					error: "No such user",
				};
			}

			return { success: true, data: user };
		} catch (err) {
			return { success: false, error: "No users found" };
		}
	},
	createUser: async function (
		username: string,
		password: string
	): Promise<ApiResponse<User>> {
		const uuid = generateUUID(24);
		const result = UserSchema.safeParse({
			id: uuid,
			name: "Default Name",
			username: username,
			password: password,
			gender: "male",
			role: "user",
			avatar: maleSVG,
			description: "no description",
			validationStatus: "active",
			registeredAt: undefined,
			lastUpdatedAt: undefined,
		});

		if (result.success === false) {
			return { success: false, error: result.error.message };
		}
		const entity = result.data satisfies User;

		try {
			await handleRequest<User>(`${BASE_API_URL}/users`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(entity),
			});
			return { success: true, data: entity };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
	deleteUser: async function (id: string): Promise<ApiResponse<boolean>> {
		try {
			await handleRequest(`${BASE_API_URL}/users/${id}`, {
				method: "DELETE",
			});
			return { success: true, data: true };
		} catch (err) {
			return { success: false, error: "Failed request" };
		}
	},
};
