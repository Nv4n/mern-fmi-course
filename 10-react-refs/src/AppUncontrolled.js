import React, { useRef } from "react";
import "./App.css";

const AppUncontrolled = (props) => {
	const input = useRef();

	const handleSubmit = (event) => {
		console.log(input);
		alert("A name was submitted: " + input.current.value);
		event.preventDefault();
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Name:
				<input type="text" ref={input} />
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default AppUncontrolled;
