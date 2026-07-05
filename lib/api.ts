import { get, ref, set, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { Psychologist } from "@/types/psychologist";
import { firebaseKey } from "@/utils/firebaseKey";

export async function getAllPsychologists(): Promise<Psychologist[]> {
  const snapshot = await get(ref(db, "psychologists"));

  if (!snapshot.exists()) {
    return [];
  }

  return snapshot.val();
}

export async function addToFavorites(uid: string, psychologistName: string) {
  const key = firebaseKey(psychologistName);

  await set(ref(db, `favorites/${uid}/${key}`), true);
}

export async function removeFromFavorites(
  uid: string,
  psychologistName: string,
) {
  const key = firebaseKey(psychologistName);
  await remove(ref(db, `favorites/${uid}/${key}`));
}

export async function checkFavorite(
  uid: string,
  psychologistName: string,
): Promise<boolean> {
  const key = firebaseKey(psychologistName);
  const snapshot = await get(ref(db, `favorites/${uid}/${key}`));

  return snapshot.exists();
}

export async function getFavoriteKeys(uid: string): Promise<string[]> {
  const snapshot = await get(ref(db, `favorites/${uid}`));

  if (!snapshot.exists()) return [];

  return Object.keys(snapshot.val());
}

export async function getFavoritePsychologists(
  uid: string,
): Promise<Psychologist[]> {
  const [favoriteKeys, allPsychologists] = await Promise.all([
    getFavoriteKeys(uid),
    getAllPsychologists(),
  ]);

  if (favoriteKeys.length === 0) return [];

  const favoriteKeySet = new Set(favoriteKeys);

  return allPsychologists.filter((psychologist) =>
    favoriteKeySet.has(firebaseKey(psychologist.name)),
  );
}
