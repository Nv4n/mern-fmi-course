/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { UserRegisterSchema } from "../model/UserFormTypes";
import { UserApiHandler } from "../service/ApiClient";
import { redirect } from "react-router-dom";

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
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);

	const onSubmit = async (data: FormUser) => {
		const resp = await UserApiHandler.findUser(data.username);
		if (resp.success === true) {
			setRespErrorMsg("Username is already taken!");
		}

		const userResp = await UserApiHandler.createUser(
			data.username,
			data.password
		);

		if (userResp.success === false) {
			setRespErrorMsg(userResp.error);
		} else {
			sessionStorage.setItem(
				"active-user",
				JSON.stringify(userResp.data)
			);

			redirect("/");
		}
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
				<p>{respErrorMsg}</p>
				<br></br>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
