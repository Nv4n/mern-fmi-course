import {
	Navigate,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import "./App.css";
import { ProductForm } from "./components/ProductForm";
import { Layout } from "./pages/Layout";
import { Shopping } from "./pages/Shopping";
import { Dashboard } from "./pages/Dashboard";
import { Cart } from "./pages/Cart";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "/*", element: <Shopping></Shopping> },
			{ path: "dashboard", element: <Dashboard></Dashboard> },
			{
				path: "product/add",
				element: <ProductForm></ProductForm>,
			},
			{
				path: "product/edit/:id",
				element: <ProductForm></ProductForm>,
			},
			{
				path: "cart",
				element: <Cart></Cart>,
			},
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
