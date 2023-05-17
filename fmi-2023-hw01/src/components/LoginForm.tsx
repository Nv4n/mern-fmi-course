import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UserObjSchema } from "../model/User";

const UserFormSchema = UserObjSchema.pick({
	username: true,
	password: true,
}).required();

type FormUser = z.infer<typeof UserFormSchema>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormUser>({ resolver: zodResolver(UserFormSchema) });

	const onSubmit = () => handleSubmit((data) => console.log(data));
	const usernameId = useId();
	const passId = useId();

	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor={usernameId}>Username:</label>
				<input {...register("username")} id={usernameId}></input>
				{errors.username && <p>{errors.username.message}</p>}

				<label htmlFor={passId}>Password:</label>
				<input {...register("username")} id={passId}></input>
				{errors.password && <p>{errors.password.message}</p>}
			</form>
		</>
	);
};
