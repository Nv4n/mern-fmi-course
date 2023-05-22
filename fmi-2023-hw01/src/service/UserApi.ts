import { type User, UserSchema } from "../model/User";
import maleSVG from "../static/male.svg";
import {
	type ApiResponse,
	BASE_API_URL,
	generateUUID,
	handleRequest,
} from "./ApiClients";

interface UserApi {
	findUserById: (id: string) => Promise<ApiResponse<User>>;
	findUser: (username: string) => Promise<ApiResponse<User>>;
	createUser: (
		username: string,
		password: string
	) => Promise<ApiResponse<User>>;
}

export const UserApiHandler: UserApi = {
	findUser: async function (username: string): Promise<ApiResponse<User>> {
		try {
			const users = await handleRequest<User[]>(`${BASE_API_URL}/users`);

			if (!users) {
				return { success: false, error: "Failed request" };
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
	findUserById: function (id: string): Promise<ApiResponse<User>> {
		throw new Error("Function not implemented.");
	},
};
