import z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must not exceed 30 characters')
    .regex(/^[A-Za-z][\w\-]*$/, 'Name must start with a letter and contain only letters, numbers, or dashes'),
  email: z
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const resetPasswordSchema = z.object({
  currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmNewPassword: z.string().min(8, 'Confirm password must be at least 8 characters long').refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  ,
})
