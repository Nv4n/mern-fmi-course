import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { UserLoginSchema } from "../model/UserFormTypes";
import { ACTIVE_USER_KEY } from "../model/User";
import { UserApiHandler } from "../service/UserApi";
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
		mode: "onChange",
	});

	const usernameId = useId();
	const passId = useId();

	const onSubmit = async (data: FormUser) => {
		const resp = await UserApiHandler.findUser(data.username);
		if (resp.success === false) {
			setRespErrorMsg(resp.error);
			return;
		}

		if (resp.data.password !== data.password) {
			setRespErrorMsg("Username or password are wrong");
			return;
		}

		if (resp.data.validationStatus !== "active") {
			setRespErrorMsg(`User is ${resp.data.validationStatus}`);
			return;
		}
		sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(resp.data));
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
					type="text"
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
