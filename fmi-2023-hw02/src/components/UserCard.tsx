import { Link, useNavigate } from "react-router-dom";
import { type User } from "../model/User";
interface UserCardProps {
	user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
	const navigate = useNavigate();
	const onDelete = async () => {
		const resp = await fetch(`/api/users/${user.id}`, {
			method: "DELETE",
		});
		if (resp.status >= 300) {
			const respData = resp.json() as Promise<{ message: string }>;
			const err = (await respData).message;
			console.log(err);
		}
		navigate(0);
	};
	return (
		<div className="card">
			<div>
				<span>
					<b>{user.username}</b>
				</span>
				{/* <Suspense fallback={<span>Loading...</span>}>
					<img
						src={user.avatar}
						alt="Avatar image"
						className="image-container"
					></img>
				</Suspense> */}
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
