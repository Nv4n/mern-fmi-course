import { z } from "zod";
// За всеки продукт (Product) се съхранява следната информация (с валидация на данните и съобщения за грешки):
// идентификатор на продукта (положително цяло число);
// име на продукта (до 80 символа);
// допълнителна информация за продукта (до 256 символа);
// цена (в Евро, неотрицателно число);
// категория (една от следните: Computers, Phones, Accessories, Software);
// снимка на продукта (валиден URL, задължителен атрибут);
// ключови думи за бързо търсене - tags (списък от тагове);

export const ProductSchema = z.object({
	id: z.number().positive().int(),
	info: z.string().max(256).nonempty(),
	price: z
		.number()
		.nonnegative()
		.or(
			z
				.string()
				.transform((val) => parseInt(val))
				.refine((val) => val >= 0, { message: "Must be non-negative" })
		),
	category: z.enum(["Computers", "Phones", "Accessories", "Software"]),
	img: z.string().url(),
	tags: z
		.string()
		.regex(/^(\w+, )*\w+$/, "Tags must be in format tag1, tag2")
		.transform((val) => val.split(", "))
		.or(z.array(z.string().nonempty())),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductFormSchema = ProductSchema.omit({ id: true });
