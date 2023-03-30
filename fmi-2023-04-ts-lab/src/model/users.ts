import { Optional } from "../common.js";
import { Repository, RepositoryImpl } from "../dao/repository.js";
import { Contact, NaturalPerson, Person } from "./person.js";

export interface User extends Person {
	username: string;
	password: string;
	roles: Role[];
}

export enum Role {
	Reader = 1,
	Author,
	Admin,
}

export class UserBase extends NaturalPerson implements User {
	constructor(
		public id: number,
		public username: string,
		public password: string,
		public roles: Role[],
		public firstName: string,
		public lastName: string,
		public email: string,
		public contact?: Contact | undefined
	) {
		super(id, firstName, lastName, email, contact);
	}
	get greeting() {
		return `User: ${this.username} [${
			super.greeting
		}] in Roles: ${this.roles.join(", ")}`;
	}
}

export interface UserRepository extends Repository<User> {
	findByUsername(username: string): Optional<User>;
}

export class UserRepositoryImpl
	extends RepositoryImpl<User>
	implements UserRepository
{
	findByUsername(username: string): Optional<User> {
		return this.findAll().find((u) => u.username === username);
	}
}
