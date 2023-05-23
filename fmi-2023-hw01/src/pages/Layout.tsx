import { Suspense, createContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ACTIVE_USER_KEY, type User } from "../model/User";

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
						<Link to={"recipe/create/"} className="nav-link">
							Add recipe
						</Link>
						{user.role === "admin" ? (
							<Link to={"/user/list"} className="nav-link">
								Dashboard
							</Link>
						) : null}
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
				{!pathname.match(/^\/^/) ? (
					<>
						{" "}
						<Link to={"/"} className="nav-link">
							Home
						</Link>
					</>
				) : null}
				{user && (
					<div>
						<span>
							<b>{`HI ${user.username}`}</b>
						</span>
						<Suspense fallback={<span>Loading...</span>}>
							<img src={user.avatar} alt="Avatar image"></img>
						</Suspense>
					</div>
				)}
				<Suspense fallback={<h2>Loading...</h2>}>
					<Outlet></Outlet>
				</Suspense>
			</div>
		</ActiveUserContext.Provider>
	);
};
