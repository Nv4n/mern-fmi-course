class User {
	constructor(id, name, password) {
		this.id = id;
		this.name = name;
		this.password = password;
		// this.toString = this.toString.bind(this);
	}

	toString() {
		return `ID:${this.id} Name:${this.name} ${this.password}`;
	}
}

const users = [
	new User(1, "John", "123"),
	new User(2, "Ivan", "123"),
	new User(3, "Petya", "123"),
	new User(4, "Gosho", "123"),
];

for (const user of users) {
	console.log(`<li>${user}</li>`);
}

const liList = users.reduce(
	(acc, user) => `${acc}<li>${user.toString()}</li>\n`,
	""
);

console.log(liList);
