import { User } from "../model/User";

const PORT = process.env.API_PORT || 4000;

const BASE_API_URL = `http://localhost:${PORT}`;

type DataType<T> = { data: T };
type ErrorType = { error: string };

type ApiResponse<T> = {
	success: boolean;
} & (DataType<T> | ErrorType);

interface UserApi {
	hasUsername: (username: string) => boolean;
	findUser: (username: string, password: string) => ApiResponse<User>;
	registerUser: (username: string, password: string) => void;
	signOut: () => void;
}

const UserApiHandler: UserApi = {
	hasUsername: function (username: string): boolean {
		throw new Error("Function not implemented.");
	},
	findUser: function (
		username: string,
		password: string
	): ApiResponse<{
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
	}> {
		throw new Error("Function not implemented.");
	},
	registerUser: function (username: string, password: string): void {
		throw new Error("Function not implemented.");
	},
	signOut: function (): void {
		throw new Error("Function not implemented.");
	},
} as const;
