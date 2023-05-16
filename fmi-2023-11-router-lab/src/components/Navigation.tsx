import { NavLink } from "react-router-dom";

export const Navigation = () => {
	return (
		<>
			<NavLink
				to="/"
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
		</>
	);
};
