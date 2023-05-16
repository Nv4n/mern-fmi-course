import React from "react";
import { render } from "react-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ index: true, element: <Home></Home> },
			{ path: "home", element: <Home></Home> },
			{ path: "about", element: <About></About> },
		],
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
