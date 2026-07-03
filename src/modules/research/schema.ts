import z from "zod";

export const ResearchRequestSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    gender: z.string().min(1, "Gender is required"),
    age: z.number().min(0, "Age must be a positive number"),
    height: z.number().min(0, "Height must be a positive number"),
    weight: z.number().min(0, "Weight must be a positive number"),
    allergies: z.string().min(1, "Allergies are required"),
    chronicDiseases: z.string().optional(),
    dailyActivityLevel: z.string().min(1, "Daily activity level is required"),
    pastInjuries: z.string().optional(),
    mainGoal: z.string().min(1, "Main goal is required")
})

