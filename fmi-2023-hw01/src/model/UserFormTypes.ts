import { z } from "zod";
import { UserObjSchema } from "./User";

const nonemptyMsg = "Must be at least 1 symbol";

export const UserLoginSchema = UserObjSchema.pick({
	username: true,
	password: true,
})
	.refine(
		(data) => {
			const { username } = data;
			return !!username;
		},
		{
			message: nonemptyMsg,
			path: ["username"],
		}
	)
	.refine(
		(data) => {
			const { password } = data;
			return !!password;
		},
		{
			message: nonemptyMsg,
			path: ["password"],
		}
	);

const UserRepasswordSchema = z.object({
	repassword: z.string(),
});

export const UserRegisterSchema = UserLoginSchema.and(
	UserRepasswordSchema
).refine(
	(data) => {
		const { password, repassword } = data;
		return password === repassword;
	},
	{
		message: "Re-Password must be the same as password",
		path: ["repassword"],
	}
);

export const UserEditSchema = UserObjSchema.omit({
	id: true,
	registeredAt: true,
	lastUpdatedAt: true,
	avatar: true,
});
