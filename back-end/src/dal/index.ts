import { PrismaClient } from "@prisma/client";
import { PainDiaryEntry } from "../types";

const prisma = new PrismaClient();

export const savePainDiaryEntry = async (entry: PainDiaryEntry) => {
  return prisma.record.create({
    data: {
      ...entry,
      date: new Date(entry.date.split("-").reverse().join("-")), // Convert DD-MM-YYYY to YYYY-MM-DD
    },
  });
};
