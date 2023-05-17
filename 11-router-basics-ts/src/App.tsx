import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import Home from "./pages/Home";
import { Layout } from "./Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "home", element: <Home /> },
			{ path: "about", element: <AboutUs /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
