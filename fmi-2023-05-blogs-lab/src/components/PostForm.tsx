import { FormEvent, useState } from "react";
import {
	Control,
	FieldError,
	FieldPath,
	FieldValues,
	Merge,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { PostCreateDto } from "../model/posts";
import "./PostForm.css";
import TextInputRHF from "./TextInputRHF";

interface FormInputTextProps<TFieldValues extends FieldValues> {
	name: Path<TFieldValues>;
	control: Control<TFieldValues, any>;
	label: string;
	rules?: Omit<
		RegisterOptions<TFieldValues, FieldPath<TFieldValues>>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;
	disabled?: boolean;
	error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

type Props = {
	onSubmit: (post: PostCreateDto) => void;
	onCancel: () => void;
};

const PostForm = ({ onSubmit, onCancel }: Props) => {
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const onReset = () => {
		setTitle("");
		setTags("");
		setContent("");
		setImageUrl("");
	};
	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		onSubmit(
			new PostCreateDto(
				title,
				content,
				1,
				tags.split(",").map((tag) => tag.trim()),
				imageUrl
			)
		);
		onReset();
	}
	return (
		<form onSubmit={handleSubmit}>
			<TextInputRHF name="Title" value={title} onChange={setTitle} />
			<TextInputRHF name="Tags" value={tags} onChange={setTags} />
			<TextInputRHF
				name="Content"
				value={content}
				onChange={setContent}
			/>
			<TextInputRHF
				name="Image"
				value={imageUrl}
				onChange={setImageUrl}
			/>
			<div className="PostForm-button-panel">
				<button
					className="btn waves-effect waves-light"
					type="submit"
					name="submit"
				>
					Submit
					<i className="material-icons right">send</i>
				</button>
				<button
					className="btn waves-effect waves-light #ff1744 orange accent-2"
					type="reset"
					name="reset"
					onClick={onReset}
				>
					Reset
					<i className="material-icons right">autorenew</i>
				</button>
				<button
					className="btn waves-effect waves-light #ff1744 red accent-3"
					type="button"
					name="cancel"
					onClick={onCancel}
				>
					Cancel
					<i className="material-icons right">cancel</i>
				</button>
			</div>
		</form>
	);
};

export default PostForm;
