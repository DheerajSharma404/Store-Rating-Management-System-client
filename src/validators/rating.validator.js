import z from "zod";

const ratingValidationSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Minimum rating is 1 only" })
    .max(5, { message: "Maximum rating is 5 only." }),
});

export default {
  ratingValidationSchema,
};
