import { z } from "zod";
import { ProductSchema } from "./Product";

// За всяка поръчка (Order) се съхранява следната информация (с валидация на данните и съобщения за грешки):
// идентификатор на поръчката (положително цяло число);
// дата и час (timestamp) на поръчката;
// списък с поръчани продукти (непразен);
// статус (Ordered, Shipped, Delivered - Ordered по подразбиране);

export const OrderSchema = z.object({
	id: z.number().positive().int(),
	date: z.date().default(() => new Date()),
	products: z.array(ProductSchema).nonempty(),
	status: z.enum(["Ordered", "Shipped", "Delivered"]).default("Ordered"),
});
export type Order = z.infer<typeof OrderSchema>;

export const OrderFormSchema = OrderSchema.omit({ id: true, date: true });
