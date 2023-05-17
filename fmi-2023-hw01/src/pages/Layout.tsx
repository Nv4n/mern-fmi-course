import { useEffect } from "react";
import * as logo from "../logo.svg";
import { Link } from "react-router-dom";
export const Layout = () => {
	useEffect(() => {
		const data = async () => {
			const resp = await fetch("http://localhost:4000/api/users");
			return resp.json();
		};
		console.log(data());
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo.default} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<Link
					className="App-link"
					to="https://reactjs.org"
					rel="noopener noreferrer"
				>
					Learn React
				</Link>
			</header>
		</div>
	);
};
