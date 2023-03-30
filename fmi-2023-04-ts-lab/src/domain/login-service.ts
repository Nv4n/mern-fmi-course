import { Optional } from "../common";
import { User } from "../model/users";

export interface LoginService {
	login(username: string, password: string): Optional<User>;
	login(user: User): Optional<User>;
	logout(): void;
}

export class LoginServiceImpl implements LoginService {
	login(username: string, password: string): Optional<User>;
	login(user: User): Optional<User>;

	login(user: string | User, password?: string): Optional<User> {
		throw new Error("Method not implemented.");
	}
	logout(): void {
		throw new Error("Method not implemented.");
	}
}
