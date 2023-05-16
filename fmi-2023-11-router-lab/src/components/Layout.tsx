import { Outlet } from "react-router-dom";
import { NavBar } from "./Navigation";

interface LayoutProps {}

export const Layout = ({}: LayoutProps) => {
	return (
		<div>
			<NavBar></NavBar>
			<Outlet></Outlet>
		</div>
	);
};
