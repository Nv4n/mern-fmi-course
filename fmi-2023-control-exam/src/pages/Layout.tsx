import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<div>
			<nav>
				<Link to={"/"}>Shopping</Link>{" "}
				<Link to={"dashboard"}>Product management</Link>{" "}
				<Link to={"cart"}>Cart</Link>
			</nav>
			<Outlet></Outlet>
		</div>
	);
};
