/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UserLoginSchema } from "../model/UserFormTypes";
import { UserApiHandler } from "../service/ApiClient";

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

	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);

	const usernameId = useId();
	const passId = useId();

	const onSubmit = async (data: FormUser) => {
		const resp = await UserApiHandler.findUser(data.username);
		if (resp.success === false) {
			setRespErrorMsg(resp.error);
		} else {
			sessionStorage.setItem("activeUser", JSON.stringify(resp.data));
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor={usernameId}>Username:</label>
				<input id={usernameId} {...register("username")}></input>
				<p>{errors.password?.message}</p>
				<br></br>
				<label htmlFor={passId}>Password:</label>
				<input
					id={passId}
					type="password"
					{...register("password")}
				></input>
				<p>{errors.password?.message}</p>
				<br></br>
				<p>{respErrorMsg}</p>
				<br></br>

				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};