import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "login", element: <LoginForm></LoginForm> },
			{ path: "register", element: <RegisterForm></RegisterForm> },
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
