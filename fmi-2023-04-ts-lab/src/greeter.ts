function greet(name: string) {
	return `Hello ${name}, from Typescript`;
}

const demoDiv = document.getElementById("demo");
if (!demoDiv) {
	throw Error("Undefined element  ");
}
demoDiv.innerHTML = greet("456");
