/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserObjSchema } from "../model/User";

const UserRegisterSchema = UserObjSchema.pick({
	username: true,
	password: true,
})
	.extend({
		repassword: z.string().nonempty(),
	})
	.required()
	.refine(
		(data) => {
			const { username } = data;
			return !!username;
		},
		{
			message: "Must be at least 1 symbol",
			path: ["username"],
		}
	)
	.refine(
		(data) => {
			const { password } = data;
			return !!password;
		},
		{
			message: "Must be at least 1 symbol",
			path: ["password"],
		}
	)
	.refine(
		(data) => {
			const { password, repassword } = data;
			return password === repassword;
		},
		{
			message: "repassword must be the same as password",
			path: ["repassword"],
		}
	);

type FormUser = z.infer<typeof UserRegisterSchema>;

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormUser>({
		resolver: zodResolver(UserRegisterSchema),
		mode: "onTouched",
	});

	const onSubmit = (data: FormUser) => {
		console.log(data);
	};
	const usernameId = useId();
	const passId = useId();
	const rePassId = useId();

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
				<label htmlFor={passId}>Re-Password</label>
				<input
					id={rePassId}
					type="password"
					{...register("repassword")}
				></input>
				<p>{errors.repassword?.message}</p>
				<br></br>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
