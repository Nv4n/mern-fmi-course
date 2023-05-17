import { z } from "zod";
import femaleSVG from "../static/female.svg";
import maleSVG from "../static/male.svg";

// User requirements
// идентификатор на записа (до 24 символа);
// име на потребителя;реализоирано
// login име (username - до 15 символа - word characters);
// парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
// пол;
// потребителска роля (user или admin);
// снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
// кратко представяне на потребителя (до 512 символа);
// статус на валидност на акаунта - (active, suspended или deactivated);
// дата и час на регистрация (генерира се автоматично);
// дата и час на последна модификация (генерира се автоматично);

export const UserObjSchema = z.object({
	id: z.string().uuid().max(24),
	name: z.string(),
	username: z.string().regex(/\w+/).max(15),
	password: z
		.string()
		.regex(/^(?=.*\d)(?=.*[^\da-zA-Zа-я А-я]).{8,}$/)
		.min(8),
	gender: z.enum(["female", "male"]),
	role: z.enum(["user", "admin"]),
	avatar: z.string().url().or(z.string()),
	description: z.string().max(512),
	validationStatus: z.enum(["active", "suspended", "deactivated"]),
	registration: z.date().default(() => new Date()),
	lastUpdated: z.date().default(() => new Date()),
});

export const UserSchema = UserObjSchema.refine(
	(schema) => {
		if (!schema?.avatar) {
			return false;
		}

		const urlValidation = z.string().url().safeParse(schema.avatar);
		if (urlValidation.success) {
			return true;
		}

		if (schema.gender === "female") {
			return schema.avatar === femaleSVG;
		}
		if (schema.gender === "male") {
			return schema.avatar === maleSVG;
		}
		return false;
	},
	{ message: "Avatar is not URL or isn't appropriate file" }
);

export type User = z.infer<typeof UserSchema>;
