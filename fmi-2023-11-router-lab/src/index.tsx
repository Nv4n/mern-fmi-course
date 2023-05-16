import React from "react";
import { render } from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navigation } from "./components/Navigation";
const router = createBrowserRouter([
	{
		path: "/*",
		index: true,
		element: (
			<div>
				<h1>Hello React Router</h1>
				<Navigation></Navigation>
			</div>
		),
	},
	{
		path: "about",
		element: (
			<div>
				<h1>About us</h1>
				<Navigation></Navigation>
			</div>
		),
	},
]);

render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
