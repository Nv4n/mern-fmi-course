const resultsElem = document.getElementById("results");

async function init() {
	await fetch("/api/users")
		.then((usersResp) => usersResp.json())
		.then(async (users) => {
			return Promise.all(
				users.map((user) =>
					fetch(`https://api.github.com/users/${user.username}`).then(
						(gitUserResp) => gitUserResp.json()
					)
				)
			);
		})
		.then((gitUsers) => {
			console.log(gitUsers);
			return gitUsers.map((gitUser) => {
				const img = new Image();
				img.src = gitUser.avatar_url;
				resultsElem.appendChild(img);
				return img;
			});
		})
		.then(
			(imgs) =>
				new Promise((resolve, reject) =>
					setTimeout(resolve, 5000, imgs)
				)
		)
		.then((imgs) =>
			imgs.forEach((img) => {
				if (img instanceof HTMLElement) img.remove();
			})
		)
		.catch((err) => console.error("Error fetching users: ", err))
		.finally(() => console.log("Demo finished"));
}

async function init2() {
	try {
		const usernamesResp = await fetch("/api/users");
		const usernames = await usernamesResp.json();
		const gitUsers = await Promise.all(
			usernames.map(async (user) => {
				const userData = await fetch(
					`https://api.github.com/users/${user.username}`
				);
				return await userData.json();
			})
		);
		console.log(gitUsers);
		const gitUsersImg = gitUsers.map((gitUser) => {
			const img = new Image();
			img.src = gitUser.avatar_url;
			resultsElem.appendChild(img);
			return img;
		});

		await new Promise((resolve, reject) =>
			setTimeout(resolve, 5000, gitUsersImg)
		);
		gitUsersImg.forEach((img) => {
			if (img instanceof HTMLElement) img.remove();
		});
	} catch (err) {
		console.error("Error fetching users: ", err);
	} finally {
		console.log("Demo finished");
	}
}

window.addEventListener("load", init2);
