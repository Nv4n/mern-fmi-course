import { useEffect, useState } from "react";
import { type User } from "../model/User";

export default function useFetchAuthor(id: string | undefined) {
	const [author, setAuthor] = useState<string | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			if (id) {
				const resp = await fetch(`/api/users/${id}`);
				if (resp.status < 300) {
					const data = (await resp.json()) as Promise<User>;
					const author = (await data).username;
					setAuthor(author);
				}
			}
		};
		void fetchData();
	}, [id]);

	return author;
}
