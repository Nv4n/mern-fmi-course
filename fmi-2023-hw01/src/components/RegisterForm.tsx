import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { UserRegisterSchema } from "../model/UserFormTypes";
import { ACTIVE_USER_KEY } from "../model/User";
import { UserApiHandler } from "../service/UserApi";
import { ActiveUserContext } from "../pages/Layout";

type FormUser = z.infer<typeof UserRegisterSchema>;

export const RegisterForm = () => {
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
		resolver: zodResolver(UserRegisterSchema),
		mode: "onTouched",
	});

	const onSubmit = async (data: FormUser) => {
		const resp = await UserApiHandler.findUser(data.username);
		if (resp.success === true) {
			setRespErrorMsg("Username is already taken!");
			return;
		}

		const userResp = await UserApiHandler.createUser(
			data.username,
			data.password
		);

		if (userResp.success === false) {
			setRespErrorMsg(userResp.error);
			return;
		}

		sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(userResp.data));
		navigate("/");
	};
	const usernameId = useId();
	const passId = useId();
	const rePassId = useId();

	return (
		<>
			{/* eslint-disable @typescript-eslint/no-misused-promises */}
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
