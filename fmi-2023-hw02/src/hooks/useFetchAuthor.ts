import { useEffect, useState } from "react";
import { UserApiHandler } from "../service/UserApi";

export default function useFetchAuthor(id: string | undefined) {
	const [author, setAuthor] = useState<string | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await UserApiHandler.findUserById(id);
				if (resp.success === true) {
					setAuthor(resp.data.username);
				}
			}
		};
		void fetchData();
	}, [id]);

	return author;
}
