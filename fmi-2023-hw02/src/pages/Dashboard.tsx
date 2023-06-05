import { Suspense, useContext, useEffect, useState } from "react";
import { type User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";
import { UserCard } from "../components/UserCard";
import { ActiveUserContext } from "./Layout";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const activeUser = useContext(ActiveUserContext);
	const navigate = useNavigate();

	if (!activeUser || activeUser.role !== "admin") {
		navigate("/");
	}

	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const resp = await UserApiHandler.findAll();
			if (resp.success === false) {
				return;
			}
			setUsers(resp.data);
		};

		void fetchData();
	}, []);

	return (
		<div>
			{users.map((u) =>
				activeUser && u.id !== activeUser.id ? (
					<Suspense fallback={<p>LOADING...</p>}>
						<UserCard user={u}></UserCard>
					</Suspense>
				) : null
			)}
		</div>
	);
};
