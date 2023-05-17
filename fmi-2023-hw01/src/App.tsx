import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
	{ path: "/*", element: <Layout></Layout> },
	{ path: "/api/*", element: <Navigate to={"/"}></Navigate> },
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
