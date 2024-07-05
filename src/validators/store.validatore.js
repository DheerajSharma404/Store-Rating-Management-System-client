import z from "zod";

const storeValidationSchema = z.object({
  name: z
    .string()
    .min(20, { message: "Name must contain at least 20 characters" })
    .max(60, { message: "Name should not contain more than 60 characters" }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().max(400),
});

export default {
  storeValidationSchema,
};
