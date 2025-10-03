import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid").trim(),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Password harus mengandung huruf, angka, dan simbol"
    )
    .trim(),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(3, "Nama minimal 3 karakter").trim(),
    confirmPassword: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        "Password harus mengandung huruf, angka, dan simbol"
      )
      .trim(),
    image: z
      .instanceof(File, { message: "File harus diupload" })
      .refine((file) => file.size <= 1_000_000, "Ukuran file maksimal 1MB")
      .refine(
        (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
        "Format harus JPG, PNG, atau WebP"
      ),
    role: z.enum(["admin", "user"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi harus sama",
    path: ["confirmPassword"],
  });

export const categorySchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter").trim(),
});

export const productSchema = z.object({
  image: z
    .instanceof(File, { message: "File harus diupload" })
    .refine((file) => file.size <= 1_000_000, "Ukuran file maksimal 1MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Format harus JPG, PNG, atau WebP"
    ),
});

export const productEditSchema = productSchema.extend({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  price: z.number().min(1, "Harga minimal 1"),
  category_id: z.int(),
})

export type FormProduct = z.infer<typeof productSchema>;
export type FormProductEdit = z.infer<typeof productEditSchema>;
export type FormCategory = z.infer<typeof categorySchema>;
export type FormRegister = z.infer<typeof registerSchema>;
export type FormLogin = z.infer<typeof loginSchema>;
