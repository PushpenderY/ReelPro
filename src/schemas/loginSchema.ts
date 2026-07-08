import {z} from "zod";

export const liginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
});