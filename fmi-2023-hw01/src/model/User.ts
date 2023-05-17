import { z } from "zod";
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

const UserSchema = z.object({
	id: z.string().uuid().max(24),
	name: z.string(),
	username: z.string().regex(/\w+/).max(15),
	password: z
		.string()
		.regex(/^(?=.*\d)(?=.*[^\da-zA-Zа-я А-я]).{8,}$/)
		.min(8),
	gender: z.enum(["female", "male", "other"]),
	role: z.enum(["user", "admin"]),
    avatar:z.string().default().
});
