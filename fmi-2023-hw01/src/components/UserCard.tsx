import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type User } from "../model/User";
import { ActiveUserContext } from "../pages/Layout";
import { UserApiHandler } from "../service/UserApi";
interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const activeUser = useContext(ActiveUserContext);
	const navigate = useNavigate();
	if (activeUser && activeUser.role !== "admin") {
		navigate("/");
	}
	const onDelete = async () => {
		const resp = await UserApiHandler.deleteUser(user.id);
		if (resp.success === false) {
			console.log(resp.error);
		}
		navigate(0);
	};
	return (
		<div className="card">
			<div>
				<span>
					<b>{user.username}</b>
				</span>
				<img src={user.avatar} alt="Avatar image"></img>
			</div>
			<>
				<Link to={`/user/edit/${user.id}`} className="nav-link">
					EDIT
				</Link>

				<button
					className="nav-link"
					onClick={() => {
						void onDelete();
					}}
				>
					DELETE
				</button>
			</>
		</div>
	);
};
