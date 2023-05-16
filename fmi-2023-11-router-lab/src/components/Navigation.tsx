import { NavLink } from "react-router-dom";

export const NavBar = () => {
	return (
		<nav>
			<NavLink
				to="/home"
				className={({ isActive, isPending }) =>
					isPending ? "pending" : isActive ? "active" : ""
				}
			>
				Home
			</NavLink>
			<NavLink
				to="/about"
				className={({ isActive, isPending }) =>
					isPending ? "pending" : isActive ? "active" : ""
				}
			>
				About us
			</NavLink>
		</nav>
	);
};
