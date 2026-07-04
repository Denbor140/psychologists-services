import { get, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { Psychologist } from "@/types/psychologist";

export async function getAllPsychologists(): Promise<Psychologist[]> {
  const snapshot = await get(ref(db, "psychologists"));

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.val();
}
