import { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";
interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const navigate = useNavigate();
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
				<Suspense fallback={<span>Loading...</span>}>
					<img
						src={user.avatar}
						alt="Avatar image"
						className="image-container"
					></img>
				</Suspense>
			</div>

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
		</div>
	);
};
