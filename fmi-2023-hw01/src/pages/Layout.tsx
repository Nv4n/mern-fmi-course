import { createContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ACTIVE_USER_KEY, type User } from "../model/User";
import { RecipePage } from "./RecipesPage";

export const ActiveUserContext = createContext<User | null>(null);
export const Layout = () => {
	const input = sessionStorage.getItem(ACTIVE_USER_KEY);
	let user: User | null = null;
	if (input) {
		user = JSON.parse(input) as User;
	}

	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<ActiveUserContext.Provider value={user}>
			<div>
				{user ? (
					<>
						<button
							className="nav-link"
							onClick={() => {
								sessionStorage.removeItem("active-user");
								navigate("/");
							}}
						>
							Sign out
						</button>{" "}
						<Link to={"/create/recipe"}>Add recipe</Link>
					</>
				) : (
					<>
						<Link className="nav-link" to={"/login"}>
							Login
						</Link>{" "}
						<Link className="nav-link" to={"/register"}>
							Register
						</Link>
					</>
				)}
				{user && (
					<div>
						<span>
							<b>{`HI ${user.username}`}</b>
						</span>
						<img src={user.avatar} alt="Avatar image"></img>
					</div>
				)}

				{pathname === "/" ? <RecipePage></RecipePage> : null}

				<Outlet></Outlet>
			</div>
		</ActiveUserContext.Provider>
	);
};
