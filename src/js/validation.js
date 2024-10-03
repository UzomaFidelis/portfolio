import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Name required" }),
  email: z.string({ required_error: "Field is required" }).email(),
  subject: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Subject required" }),
  message: z
    .string({ required_error: "Field is required" })
    .min(1, { message: "Message required" }),
});
