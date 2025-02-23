import { useMutation } from "@tanstack/react-query";
import { addPainDiaryRecord, PainDiaryEntry, ApiResponse } from "../api";

export const useAddPainDiary = () => {
  return useMutation<ApiResponse<PainDiaryEntry>, Error, PainDiaryEntry>({
    mutationFn: (entry) => addPainDiaryRecord(entry),
  });
};
