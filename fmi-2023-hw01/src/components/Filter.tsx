import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type ReturnAuthorsType } from "../hooks/userFetchAllAuthors";

export interface FilterParams {
	author?: string;
	tag?: string;
}

interface FilterProps {
	authors: ReturnAuthorsType[];
	tags: string[];
}
const NoAuthor = "no-author";
const NoTag = "no-tag";

export const Filter = ({ authors, tags }: FilterProps) => {
	const [filterAuthor, setFilterAuthor] = useState<string>(NoAuthor);
	const [filterTag, setFilterTag] = useState<string>(NoTag);
	const navigate = useNavigate();

	const authorsId = useId();
	const tagsId = useId();

	const onApply = () => {
		navigate(`/?author=${filterAuthor}&tag=${filterTag}`);
	};
	const onClear = () => {
		navigate(`/?author=${NoAuthor}&tag=${NoTag}`);
	};
	return (
		<div>
			<>
				<label htmlFor={authorsId}>Authors:</label>{" "}
				<select
					id={authorsId}
					onChange={(e) => setFilterAuthor(e.target.value)}
					onBlur={(e) => setFilterAuthor(e.target.value)}
				>
					<option value={NoAuthor}> ----NO AUTHOR---- </option>
					{authors.map((author) => (
						<option key={author.id} value={author.id}>
							{author.name}
						</option>
					))}
				</select>
				<br></br>
			</>
			<>
				<label htmlFor={tagsId}>Tags:</label>{" "}
				<select
					id={tagsId}
					onChange={(e) => setFilterTag(e.target.value)}
					onBlur={(e) => setFilterTag(e.target.value)}
				>
					<option value={NoTag}> ----NO TAG---- </option>
					{tags.map((tag) => (
						<option key={tag} value={tag}>
							{tag}
						</option>
					))}
				</select>
				<br></br>
			</>
			<button onClick={() => onApply()}>Apply filters</button>{" "}
			<button onClick={() => onClear()}>Clear filters</button>
		</div>
	);
};
