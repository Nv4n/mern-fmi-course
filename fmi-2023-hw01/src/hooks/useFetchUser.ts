import { useEffect, useState } from "react";
import { type User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";

export default function useFetchUser(id: string | undefined) {
	const [user, setUser] = useState<User | undefined>(undefined);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await UserApiHandler.findUserById(id);
				if (resp.success === false) {
					console.log(resp.error);
					return;
				}

				setUser(resp.data);
			} else {
				setUser(undefined);
			}
		};
		void fetchData();
	}, [id]);

	return user;
}
