import { Request, Response } from "express";
import { painDiarySchema } from "../types";
import { savePainDiaryEntry } from "../dal";

export const savePainDiaryHandler = async (req: Request, res: Response): Promise<void> => {
  const validation = painDiarySchema.safeParse(req.body);

  if (!validation.success) {
      res.status(400).json({ error: validation.error.errors });
  }

    try {
        if (validation.data) {
            const newEntry = await savePainDiaryEntry(validation.data);
            res.status(201).json(newEntry);
        }
    } catch (error) {
        console.error("Error saving pain diary entry:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
