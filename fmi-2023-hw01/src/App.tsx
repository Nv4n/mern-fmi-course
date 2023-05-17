import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./pages/Layout";
import { LoginForm } from "./components/LoginForm";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "login", element: <LoginForm></LoginForm> },
			{ path: "register", element: <LoginForm></LoginForm> },
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
