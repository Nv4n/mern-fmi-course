import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { type z } from "zod";
import useFetchUser from "../hooks/useFetchUser";
import { ValidationStatuses, type User, Genders, Roles } from "../model/User";
import { UserEditSchema } from "../model/UserFormTypes";
import { ActiveUserContext } from "../pages/Layout";
import { UserApiHandler } from "../service/UserApi";
import femaleSVG from "../static/female.svg";
import maleSVG from "../static/male.svg";

export type FormUser = z.infer<typeof UserEditSchema>;

function isKeyOfUser(key: string, recipe: User): key is keyof FormUser {
	return key in recipe;
}

export const UserEditForm = () => {
	const [respErrorMsg, setRespErrorMsg] = useState<string | null>(null);
	const { id } = useParams();
	const user: User | undefined = useFetchUser(id);

	const navigate = useNavigate();
	const activeUser = useContext(ActiveUserContext);
	useEffect(() => {
		if (!activeUser || activeUser.role !== "admin") {
			navigate("/");
		}
	}, [activeUser]);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormUser>({
		resolver: zodResolver(UserEditSchema),
		mode: "onChange",
	});

	useEffect(() => {
		if (!user) {
			return;
		}
		const defaultValues: FormUser = {
			name: user.name,
			username: user.username,
			password: user.password,
			gender: user.gender,
			role: user.role,
			description: user.description,
			validationStatus: user.validationStatus,
		};

		for (const key in defaultValues) {
			if (isKeyOfUser(key, user)) {
				setValue(key, defaultValues[key]);
			}
		}
	}, [user]);

	const generateInput = (
		label: string,
		field: keyof FormUser,
		fieldType?: "text" | "number",
		inputType?: "textArea"
	) => {
		const id = useId();
		return (
			<>
				<label htmlFor={id}>{label}: </label>
				{inputType ? (
					<>
						<br></br>
						<textarea {...register(field)} id={id} />
					</>
				) : (
					<input
						{...register(field)}
						id={id}
						min={1}
						type={fieldType}
					/>
				)}
				<p>{errors[field]?.message}</p>
				<br></br>
			</>
		);
	};

	const onSubmit = async (data: FormUser) => {
		if (!activeUser) {
			setRespErrorMsg("No active user");
			return;
		}

		if (!user) {
			setRespErrorMsg("No such recipe");
			return;
		}
		const entity: User = {
			id: user.id,
			avatar: data.gender === "male" ? maleSVG : femaleSVG,
			registeredAt: new Date(user.registeredAt),
			lastUpdatedAt: new Date(),
			...data,
		};

		const resp = await UserApiHandler.updateUser(entity);

		if (resp.success === false) {
			setRespErrorMsg(resp.error);
			return;
		}
		console.log(resp.data);
		navigate("/user/list");
	};

	const validationStatusId = useId();
	const genderId = useId();
	const roleId = useId();

	return (
		<>
			{/* eslint-disable @typescript-eslint/no-misused-promises */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>RECIPES ARE ADDED HERE</h1>
				{generateInput("Name", "name")}
				{generateInput("Username", "username")}
				{generateInput("Password", "password")}
				{user && (
					<>
						<label htmlFor={genderId}>Gender:</label>{" "}
						<select id={genderId} {...register("gender")}>
							{Genders.map((gender) => (
								<option key={gender} value={gender}>
									{gender}
								</option>
							))}
						</select>
						<p>{errors["gender"]?.message}</p>
						<br></br>
					</>
				)}
				{user && (
					<>
						<label htmlFor={roleId}>Role:</label>{" "}
						<select id={roleId} {...register("role")}>
							{Roles.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
						<p>{errors["role"]?.message}</p>
						<br></br>
					</>
				)}
				{user && (
					<>
						<label htmlFor={validationStatusId}>
							Validation Status:
						</label>{" "}
						<select
							id={validationStatusId}
							{...register("validationStatus")}
						>
							{ValidationStatuses.map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
						<p>{errors["validationStatus"]?.message}</p>
						<br></br>
					</>
				)}
				{generateInput(
					"Description",
					"description",
					undefined,
					"textArea"
				)}

				<p>{respErrorMsg}</p>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	);
};
