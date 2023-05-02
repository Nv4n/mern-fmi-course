import React, { useRef, useState } from "react";
import "./App.css";

const AppControlled = () => {
	const { name, setName } = useState("");

	const handleSubmit = (event) => {
		console.log(name);
		alert("A name was submitted: " + name);
		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name:
				<input
					type="text"
					value={name}
					onChange={(event) => setName(event.currentTarget.value)}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default AppControlled;
