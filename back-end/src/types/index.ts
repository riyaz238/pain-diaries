import { z } from "zod";

export const painDiarySchema = z.object({
    patientId: z.string(),
    date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // Ensures DD-MM-YYYY format
    activity: z.string().max(500),
    painlevel: z.string(),
    medication: z.string().max(500),
    timePeriod: z.string(),
});

export type PainDiaryEntry = z.infer<typeof painDiarySchema>;
