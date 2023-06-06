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
import { RecipeDetails } from "./pages/RecipeDetails";
import { RecipePage } from "./pages/RecipesPage";
import { Dashboard } from "./pages/Dashboard";
import { UserEditForm } from "./components/UserEditForm";

const router = createBrowserRouter([
	{
		path: "/*",
		element: <Layout></Layout>,
		children: [
			{ path: "/*", element: <RecipePage></RecipePage> },
			{ path: "login", element: <LoginForm></LoginForm> },
			{ path: "register", element: <RegisterForm></RegisterForm> },
			{ path: "recipe/create", element: <RecipeForm></RecipeForm> },
			{ path: "recipe/edit/:id", element: <RecipeForm></RecipeForm> },
			{ path: "recipe/:id", element: <RecipeDetails></RecipeDetails> },
			{ path: "user/edit/:id", element: <UserEditForm></UserEditForm> },
			{ path: "user/list", element: <Dashboard></Dashboard> },
		],
	},
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;