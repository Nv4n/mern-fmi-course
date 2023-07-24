import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { ACTIVE_USER_KEY, type User } from "../model/User";
import { UserLoginSchema } from "../model/UserFormTypes";
import { ActiveUserContext } from "../pages/Layout";

type FormUser = z.infer<typeof UserLoginSchema>;

export const LoginForm = () => {
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);
	const navigate = useNavigate();
	const activeUser = useContext(ActiveUserContext);

	useEffect(() => {
		if (activeUser) {
			navigate("/");
		}
	}, [activeUser]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormUser>({
		resolver: zodResolver(UserLoginSchema),
		mode: "onTouched",
	});

	const usernameId = useId();
	const passId = useId();

	const onSubmit = async (data: FormUser) => {
		const resp = await fetch(`/api/users/username/${data.username}`);
		if (resp.status >= 300) {
			const data = resp.json() as Promise<{ message: string }>;
			const err = (await data).message;
			setRespErrorMsg(err);
			return;
		}

		const respData = resp.json() as Promise<User>;
		const user = await respData;
		if (user.password !== data.password) {
			setRespErrorMsg("Username or password are wrong");
			return;
		}

		if (user.validationStatus !== "active") {
			setRespErrorMsg(`User is ${user.validationStatus}`);
			return;
		}
		sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
		navigate("/");
	};

	return (
		<>
			{/* eslint-disable @typescript-eslint/no-misused-promises */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor={usernameId}>Username: </label>
				<input id={usernameId} {...register("username")}></input>
				<p>{errors.username?.message}</p>
				<br></br>
				<label htmlFor={passId}>Password: </label>
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
