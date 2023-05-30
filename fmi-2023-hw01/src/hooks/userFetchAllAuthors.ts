import { useEffect, useState } from "react";
import { type Recipe } from "../model/Recipe";
import { UserApiHandler } from "../service/UserApi";

export type ReturnAuthorsType = { name: string; id: string };
export default function usetFetchAllAuthors(recipes: Recipe[]) {
	const [authors, setAuthors] = useState<ReturnAuthorsType[]>([]);
	useEffect(() => {
		const uniqueAuthors: ReturnAuthorsType[] = [];
		const fetchUser = async (id: string) => {
			const resp = await UserApiHandler.findUserById(id);
			if (resp.success === true) {
				uniqueAuthors.push({ name: resp.data.username, id: id });
			}
		};
		const fetchUsers = async () => {
			const authorIds = new Set<string>();
			recipes.forEach((recipe) => {
				authorIds.add(recipe.authorId);
			});

			for (const id of authorIds) {
				await fetchUser(id);
			}

			setAuthors([...uniqueAuthors]);
		};
		if (recipes.length > 0) {
			void fetchUsers();
		}
	}, [recipes]);

	return authors;
}
