import { NaturalPerson, Person } from "./model/person.js";
import { UserBase, Role } from "./model/users.js";

function greet(person: Person) {
	return `Hello ${person.greeting}, from TypeScript!`;
}

const p1 = new NaturalPerson(1, "Trayan", "Iliev", "trayan@gmail.com");

document.getElementById("demo")!.innerHTML = greet(p1);

const u1 = new UserBase(
	1,
	"username",
	"123",
	[Role.Reader, Role.Author],
	p1.firstName,
	p1.lastName,
	p1.email,
	p1.contact
);
console.log(u1.greeting);

document.getElementById("demo")!.innerHTML += "<br>" + u1.greeting;
