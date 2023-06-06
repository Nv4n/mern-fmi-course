import { ObjectId } from "mongodb";
import z from "zod";

export const IdSchema = z.string().default(() => {
	const val = new ObjectId();
	return val.toString();
});