import {
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import "./App.css";
import { ProductForm } from "./components/ProductForm";
import { Layout } from "./pages/Layout";
import { Shopping } from "./pages/Shopping";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "/", element: <Shopping></Shopping> },
			{
				path: "product/add",
				element: <ProductForm></ProductForm>,
			},
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
