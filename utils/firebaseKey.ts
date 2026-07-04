export function firebaseKey(value: string) {
  return value.replace(/[.#$[\]]/g, "_");
}
