import { Link, Outlet, useNavigate } from "react-router-dom";
import { type User } from "../model/User";
export const Layout = () => {
	const input = sessionStorage.getItem("active-user");
	let user: User | null = null;
	if (input) {
		user = JSON.parse(input) as User;
	}
	const navigate = useNavigate();

	return (
		<div>
			{user ? (
				<>
					<button
						onClick={() => {
							sessionStorage.removeItem("active-user");
							navigate("/");
						}}
					>
						Sign out
					</button>
				</>
			) : (
				<>
					<Link to={"/login"}>Login</Link>{" "}
					<Link to={"/register"}>Register</Link>
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

			<Outlet></Outlet>
		</div>
	);
};
