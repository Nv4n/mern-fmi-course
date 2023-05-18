/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UserLoginSchema } from "../model/UserFormTypes";

type FormUser = z.infer<typeof UserLoginSchema>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormUser>({
		resolver: zodResolver(UserLoginSchema),
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
				<input
					id={passId}
					type="password"
					{...register("password")}
				></input>
				<p>{errors.password?.message}</p>
				<br></br>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
