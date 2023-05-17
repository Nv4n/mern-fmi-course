/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UserObjSchema } from "../model/User";

const UserFormSchema = UserObjSchema.pick({
	username: true,
	password: true,
})
	.required()
	.refine(
		(data) => {
			const { username, password } = data;
			return !!username && !!password;
		},
		{ message: "Must contain at least one symbol" }
	);

type FormUser = z.infer<typeof UserFormSchema>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormUser>({
		resolver: zodResolver(UserFormSchema),
		mode: "onTouched",
	});

	const onSubmit = (data: FormUser) => {
		console.log(data);
	};

	const usernameId = useId();
	const passId = useId();

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor={usernameId}>Username:</label>
				<input id={usernameId} {...register("username")}></input>
				<p>{errors.username?.message}</p>
				<br></br>
				<label htmlFor={passId}>Password:</label>
				<input id={passId} {...register("password")}></input>
				<p>{errors.password?.message}</p>
				<br></br>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
