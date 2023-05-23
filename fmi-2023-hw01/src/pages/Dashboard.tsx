import { useEffect, useState } from "react";
import { User } from "../model/User";
import { UserApiHandler } from "../service/UserApi";

const Dashboard = () => {
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const resp = await UserApiHandler.findAll();
			if (resp.success === false) {
				return;
			}
			setUsers(resp.data);
		};
	}, []);

    return(
        
    )
};
