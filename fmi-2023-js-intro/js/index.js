async function init() {
	const res = await fetch("/api/posts");
	if (!res.ok) {
		return;
	}
	const posts = res.json();
	document.getElementById("results").innerHTML = `
    ${posts}
`;
}

window.addEventListener("load", init);
