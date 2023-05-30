import { z } from "zod";
import { UserObjSchema } from "./User";
// Recipe requirements
// идентификатор на рецептата (до 24 символа);
// идентификатор на потребителя споделил рецептата (до 24 символа);
// име на рецептата (до 80 символа);
// кратко описание на рецептата (до 256 символа);
// време за приготвяне (в минути);
// използвани продукти (списък от продукти);
// снимка на резултата от рецептата (валиден URL, задължителен атрибут);
// подробно описание (до 2048 символа);
// ключови думи - tags (списък от тагове);
// дата и час на споделяне (генерира се автоматично);
// дата и час на последна модификация (генерира се автоматично);
export const RecipeSchema = z.object({
	id: z
		.string()
		.max(24)
		.regex(/^[a-zA-Z0-9]{1,24}$/),
	authorId: UserObjSchema.shape.id,
	title: z.string().max(80),
	shortDescription: z.string().max(256),
	cookingTime: z
		.string()
		.transform((val) => parseInt(val))
		.refine(
			(val) => {
				return z.number().positive().finite().safe().safeParse(val)
					.success;
			},
			{ message: "Cooking time is out of range" }
		)
		.or(z.number().positive().finite().safe()),
	products: z
		.string()
		.regex(
			/^(([a-zA-Z0-9А-Яа-я_] ?)+, )*([a-zA-Z0-9А-Яа-я_] ?)+$/,
			"Products must be in format: product1, product2"
		)
		.transform((val) => val.split(", "))
		.or(z.array(z.string())),
	cookedImg: z.string().url(),
	description: z.string().max(2048),
	tags: z
		.string()
		.regex(/^(\w+, )*\w+$/, "Tags must be in format: tag1, tag2")
		.transform((val) => val.split(", "))
		.or(z.array(z.string())),
	publishedAt: z.date().default(() => new Date()),
	lastUpdated: z.date().default(() => new Date()),
});

export type Recipe = z.infer<typeof RecipeSchema>;
