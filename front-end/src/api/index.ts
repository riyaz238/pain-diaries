export interface PainDiaryEntry {
    patientId: string;
    date: string; // Expected format: DD-MM-YYYY
    activity: string;
    painlevel: string;
    medication: string;
    timePeriod: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const BASE_URL = "http://localhost:3000";

/**
 * Sends a POST request to add a new pain diary record.
 * @param entry - The pain diary entry object
 * @returns - Promise<ApiResponse<PainDiaryEntry>>
 */
export const addPainDiaryRecord = async (
  entry: PainDiaryEntry
): Promise<ApiResponse<PainDiaryEntry>> => {
  try {
    const response = await fetch(`${BASE_URL}/painDiary/saveData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Failed to add record" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
};
