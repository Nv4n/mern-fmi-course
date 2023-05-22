import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { RecipeForm } from "./components/RecipeForm";
import { RegisterForm } from "./components/RegisterForm";
import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "login", element: <LoginForm></LoginForm> },
			{ path: "register", element: <RegisterForm></RegisterForm> },
			{ path: "create/recipe", element: <RecipeForm></RecipeForm> },
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
