import {
  get,
  ref,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
  set,
  remove,
  startAt,
  endAt,
  endBefore,
  limitToLast,
} from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { Psychologist } from "@/types/psychologist";
import { firebaseKey } from "@/utils/firebaseKey";
import { FilterValue } from "@/types/FilterValue";
import { getPsychologistsFilters } from "./getPsychologistsFilters";

const PAGE_SIZE = 3;
export type Cursor = { value: string | number; key: string } | null;

interface getAllPsychologistResponse {
  items: Psychologist[];
  lastCursor: Cursor;
  hasMore: boolean;
}

export async function getAllPsychologists(
  filter: FilterValue,
  cursor: Cursor = null,
): Promise<getAllPsychologistResponse> {
  const { field, direction, rangeStart, rangeEnd } =
    getPsychologistsFilters(filter);

  const constraints = [orderByChild(field)];

  if (direction === "asc") {
    if (cursor) {
      constraints.push(startAfter(cursor.value, cursor.key));
    } else if (rangeStart !== undefined) {
      constraints.push(startAt(rangeStart));
    }
    if (rangeEnd !== undefined) {
      constraints.push(endAt(rangeEnd));
    }
    constraints.push(limitToFirst(PAGE_SIZE + 1));
  } else {
    if (cursor) {
      constraints.push(endBefore(cursor.value, cursor.key));
    }
    constraints.push(limitToLast(PAGE_SIZE + 1));
  }

  const snapshot = await get(query(ref(rtdb, "psychologists"), ...constraints));

  if (!snapshot.exists()) {
    return { items: [], lastCursor: null, hasMore: false };
  }

  let raw: (Psychologist & { id: string })[] = [];
  snapshot.forEach((child) => {
    raw.push({ id: child.key!, ...child.val() });
  });

  if (direction === "desc") {
    raw = raw.reverse();
  }

  const hasMore = raw.length > PAGE_SIZE;
  const items = hasMore ? raw.slice(0, PAGE_SIZE) : raw;

  const boundaryItem = hasMore ? raw[PAGE_SIZE] : null;
  const lastCursor: Cursor = boundaryItem
    ? { value: boundaryItem[field], key: boundaryItem.id }
    : null;

  return { items, lastCursor, hasMore };
}

export async function addToFavorites(uid: string, psychologistName: string) {
  const key = firebaseKey(psychologistName);

  await set(ref(rtdb, `favorites/${uid}/${key}`), true);
}

export async function removeFromFavorites(
  uid: string,
  psychologistName: string,
) {
  const key = firebaseKey(psychologistName);
  await remove(ref(rtdb, `favorites/${uid}/${key}`));
}

export async function checkFavorite(
  uid: string,
  psychologistName: string,
): Promise<boolean> {
  const key = firebaseKey(psychologistName);
  const snapshot = await get(ref(rtdb, `favorites/${uid}/${key}`));

  return snapshot.exists();
}

export async function getFavoriteKeys(uid: string): Promise<string[]> {
  const snapshot = await get(ref(rtdb, `favorites/${uid}`));

  if (!snapshot.exists()) return [];

  return Object.keys(snapshot.val());
}

export async function getAllPsychologistsFlat(): Promise<Psychologist[]> {
  const snapshot = await get(ref(rtdb, "psychologists"));

  if (!snapshot.exists()) return [];

  const items: Psychologist[] = [];
  snapshot.forEach((childSnapshot) => {
    items.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    } as Psychologist);
  });

  return items;
}

export async function getFavoritePsychologists(
  uid: string,
): Promise<Psychologist[]> {
  const [favoriteKeys, allPsychologists] = await Promise.all([
    getFavoriteKeys(uid),
    getAllPsychologistsFlat(),
  ]);

  if (favoriteKeys.length === 0) return [];

  const favoriteKeySet = new Set(favoriteKeys);

  return allPsychologists.filter((psychologist) =>
    favoriteKeySet.has(firebaseKey(psychologist.name)),
  );
}
