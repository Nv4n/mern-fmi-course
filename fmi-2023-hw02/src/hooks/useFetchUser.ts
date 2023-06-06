import { useEffect, useState } from "react";
import { type User } from "../model/User";

export default function useFetchUser(id: string | undefined) {
	const [user, setUser] = useState<User | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await fetch(`/api/users/${id}`);

				if (resp.status < 300) {
					const data = resp.json() as Promise<User>;
					const user = await data;
					setUser(user);
				}
			} else {
				setUser(undefined);
			}
		};
		void fetchData();
	}, [id]);

	return user;
}
