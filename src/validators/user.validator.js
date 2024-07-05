import z from "zod";

const userSignUpValidationSchema = z.object({
  name: z
    .string()
    .min(20, { message: "Name must contain at least 20 characters" })
    .max(60, { message: "Name should not contain more than 60 characters" }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters." })
    .max(16, { message: "Password must not exceed 16 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain at least one symbol.",
    }),
  address: z.string().max(400),
  role: z.enum(["admin", "normal", "store_owner"]).default("normal"),
});

const userSignInValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*]/, {
      message: "Password must contain at least one symbol.",
    }),
});

export default {
  userSignInValidationSchema,
  userSignUpValidationSchema,
};
