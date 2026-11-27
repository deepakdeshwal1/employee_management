import { z } from "zod";

const EmployeeSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters").trim(),
  email: z.string().email("Invalid email address").toLowerCase(),
  department: z.string().min(2, "Must be at least 2 characters").trim(),
  salary: z.number().int().positive(),
  joiningDate: z.iso
    .date()
    .refine((date) => date <= new Date().toISOString().slice(0, 10), {
      message: "Joining date cannot be greater than today",
    })
    .transform((date) => new Date(`${date}T00:00:00.000Z`)),
});

const EmployeePartialSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters").trim().optional(),
  email: z.string().email("Invalid email address").toLowerCase().optional(),
  department: z
    .string()
    .min(2, "Must be at least 2 characters")
    .trim()
    .optional(),
  salary: z.number().int().positive().optional(),
  joiningDate: z.iso
    .date()
    .refine((date) => date <= new Date().toISOString().slice(0, 10), {
      message: "Joining date cannot be greater than today",
    })
    .transform((date) => new Date(`${date}T00:00:00.000Z`))
    .optional(),
});

export default { EmployeeSchema, EmployeePartialSchema };
