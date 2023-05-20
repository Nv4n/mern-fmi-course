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
		.regex(/^[a-zA-Z0-9]{24}$/gm),
	authorId: UserObjSchema.shape.id,
	title: z.string().max(80),
	shortDescription: z.string().max(256),
	cookingTime: z.number().positive().finite().safe(),
	products: z.array(z.string()),
	cookedImg: z.string().url(),
	description: z.string().max(2048),
	tags: z.array(z.string()),
	publishedAt: z.date().default(() => new Date()),
	lastUpdated: z.date().default(() => new Date()),
});

export type Recipe = z.infer<typeof RecipeSchema>;
