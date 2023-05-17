import { Link, Outlet } from "react-router-dom";
export const Layout = () => {
	return (
		<div>
			<Link to={"/login"}>Login</Link>
			<Link to={"/register"}>Register</Link>
			<Outlet></Outlet>
		</div>
	);
};
