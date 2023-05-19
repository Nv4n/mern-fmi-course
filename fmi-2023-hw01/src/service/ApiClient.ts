import crypto from "crypto";
import { type User, UserSchema } from "../model/User";
import maleSVG from "../static/male.svg";

const PORT = process.env.API_PORT || 4000;

const BASE_API_URL = `http://localhost:${PORT}`;

export type ApiResponse<T> =
	| {
			success: true;
			data: T;
	  } //
	| {
			success: false;
			error: string;
	  }; //

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
		const result = UserSchema.safeParse({
			id: crypto.randomUUID().slice(0, 24),
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
			return { success: false, error: "Failed request" };
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
	findUserById: function (id: string): Promise<
		ApiResponse<{
			id: string;
			name: string;
			username: string;
			password: string;
			gender: "female" | "male";
			role: "user" | "admin";
			avatar: string;
			description: string;
			validationStatus: "active" | "suspended" | "deactivated";
			registeredAt: Date;
			lastUpdatedAt: Date;
		}>
	> {
		throw new Error("Function not implemented.");
	},
};

const handleRequest = async <D>(url: string, options?: RequestInit) => {
	try {
		const resp = await fetch(url, options);
		if (resp.status >= 400) {
			return Promise.reject(resp.body);
		}
		return resp.json() as D;
	} catch (err) {
		return Promise.reject(err);
	}
};
